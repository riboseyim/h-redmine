#!/usr/local/bin/perl
use strict;
use utf8;
use DBI;
use Data::Dumper;
use Spreadsheet::ParseExcel;
use Spreadsheet::WriteExcel;
use Net::FTP;
use Encode;
use FindBin qw($Bin);
use open ':encoding(utf8)';

################################################################
#作者：严睿
#
#创建时间：2014-07-29
#
#Redmine统计分析报表
#
#2014-12-09:支持echarts图表数据输出
################################################################

#utf8
binmode(STDIN, ':encoding(utf8)');
binmode(STDOUT, ':encoding(utf8)');
binmode(STDERR, ':encoding(utf8)');

#实时调用参数
my $RptName='DeptRpt';
my $statday='2014-07-01';
my $finishday='2014-07-31';
my $userid='';
my $username='';
my $Qnum;

##实时调用检验参数
if(@ARGV > 0){	
	$RptName = $ARGV[0];		
	$statday = $ARGV[1];		
	$finishday = $ARGV[2];		
	print "input paras:RptName=$RptName statday=$statday  finishday=$finishday \n";
	if($RptName eq 'SingleRpt'){
		$userid=$ARGV[3];	
		$username=$ARGV[4];	
		print "userid=$userid   username=$username   \n";
	}
	if($RptName eq 'AreaQRpt'){
		$Qnum=$ARGV[1];	
		print "Qnum=$Qnum   \n";
	}
}else{
	print "please input paras:RptName(DeptRpt|AlarmRpt|MembersRpt|SingleRpt) statday  finishday  ....... \n";	
}

### 使用lib函数连接数据库
unshift (@INC,"/home/redmine/lib/");
require ("SetBookFmt.pl");#报表格式库

my ($ref,$dbh,$sth,$statement);

# database config
my $host = "localhost";
my $port = 3311;
my $database = "bitnami_redmine";
my $socket = "/slview/redmine2/mysql/tmp/mysql.sock";
my $data_source = "DBI:mysql:$database;host=$host;port=$port;mysql_socket=$socket";
my $username = "bitnami";
my $password = "fc862b57a1";

# connect db
$dbh = DBI->connect($data_source, $username, $password) or die $DBI::errstr;

# db connect config
$dbh->{"mysql_auto_reconnect"} = 1;
$dbh->{"AutoCommit"} = 0;
$dbh->{"mysql_enable_utf8"} = 1;
$dbh->do("set character_set_client=utf8");
$dbh->do("set character_set_connection=utf8");
$dbh->do("set character_set_results=utf8");
$dbh->do("set names utf8");

my $tmptime = getTimeNum();

#my $statday='2014-07-01';
#my $finishday='2014-07-31';

my %AreaHash=(
 '云南'=>'45',
 '四川'=>'36',
 '宁夏'=>'64',
 '广东'=>'29',
 '广西'=>'21',
 '甘肃'=>'60',
 '福建'=>'37',
 '重庆'=>'39',
 '陕西'=>'28',
 '青海'=>'68'
);



print "Redmine 统计分析==$RptName  $tmptime====\n";

if($RptName eq 'DeptRpt'){
	&DeptRpt();
}

if($RptName eq 'AlarmRpt'){
	&AlarmRpt();
}
if($RptName eq 'MembersRpt'){
	&MembersRpt();
}
if($RptName eq 'SingleRpt'){
	&SingleRpt('1','yanrui');
}
if($RptName eq 'UserTrackerRpt'){
	&UserTrackerRpt();
}

if($RptName eq 'ProjectTrackerRpt'){
	&ProjectTrackerRpt();
}

if($RptName eq 'AreaMonthRpt'){
	&AreaMonthRpt();
}

if($RptName eq 'AreaQRpt'){
	&AreaQRpt();
}

sub AreaQRpt(){
	my $TimeEntrys;
	my $lastMonths=&LastMonthsNum($Qnum);
	print "lastMonths:$lastMonths \n";
	my @months=split(",",$lastMonths);

	my $count=0;

	while($count<=@months-1){
		$statday=$months[$count]."-01";
		$finishday=$months[$count]."-31";
		print("element$count:$months[$count]\n");

		$TimeEntrys .= &AreaMonthRpt($months[$count],$statday,$finishday);
		$count++;
	}

	open(WRITE,">echarts-area-change.csv");
			print WRITE $TimeEntrys;
	close(WRITE);


}

sub AreaMonthRpt(){
	my ($month,$statday,$finishday)=@_;
	my ($userid,$username) = ('ALL','Dept');
	my $starttime = getTimeNum();
	print "==============$username 大区月报表 现场 趋势图=========\n";

	my $today=todayNum();

	my $sql="";

	my $areaLength=scalar(keys %AreaHash);
	
	my $i=1;
	foreach my $areaName (sort keys %AreaHash)
	{
		my $areaid=$AreaHash{$areaName};

	 $sql .="select '$areaName','$month', sum(t.hours) as '工时' from issues i ,time_entries t,projects p
			where i.id=t.issue_id and t.project_id=p.id 
			and t.spent_on>='$statday'  and t.spent_on<='$finishday' 
			and p.parent_id='$areaid' \n";

		if($i<$areaLength){
			$sql .=" union \n";
		}
			
		$i++;
	}
	print $sql."\n";
	
	my $sth = $dbh->prepare($sql);
	$sth->execute();

	my %RptHash;
	while ($ref=$sth->fetchrow_arrayref()) 
	{	
		print "$ref->[0] $ref->[1] $ref->[2] \n";
		$RptHash{$ref->[0]}{'月份'} = $ref->[1];
		$RptHash{$ref->[0]}{'工时'} = $ref->[2];
	}
	
	print Dumper %RptHash;

	my $areas;
	my $TimeEntrys;

	foreach my $area (sort keys %RptHash)
	{
		my $Month=$RptHash{$area}{'月份'}; 
		my $TimeEntry=$RptHash{$area}{'工时'} ne '' ? $RptHash{$area}{'工时'}:'0';
		
		$TimeEntrys .="\"$area\",\"$Month\",\"$TimeEntry\" \n";
		
	}
	return $TimeEntrys;
}


sub ProjectTrackerRpt(){
	my ($userid,$username) = ('ALL','Dept');
	my $starttime = getTimeNum();
	print "==============$username 大区月报表 项目 跟踪分类图=========\n";

	my $today=todayNum();
	my $sql ="select * from (";
	   $sql .="select p.name as '项目',tr.name as '跟踪标签',sum(t.hours) as hours 
			 from issues i ,time_entries t,projects p,trackers tr
			 where i.id=t.issue_id and t.project_id=p.id and i.tracker_id=tr.id
			and t.spent_on>=?  and t.spent_on<=?
			group by p.id,tracker_id
			order by p.id,tr.id ";
	   $sql .=" ) M where M.hours>50";
	
	print $sql."\n";
	
	my $sth = $dbh->prepare($sql);
	$sth->execute($statday,$finishday);

	my %RptHash;
	while ($ref=$sth->fetchrow_arrayref()) 
	{
		$RptHash{$ref->[0]}{$ref->[1]} = $ref->[2];
	}
	
	#print Dumper %RptHash;

	my $projects;
	my $dev;
	my $deploy;
    my $case;
	my $inner;

	foreach my $project (sort keys %RptHash)
	{
		$projects .= "'".$project."',";

		my $devTime=$RptHash{$project}{'开发流程'} ne '' ? $RptHash{$project}{'开发流程'}:'0';
		$dev .= $devTime.",";

		my $deployTime=$RptHash{$project}{'实施流程'} ne ''?$RptHash{$project}{'实施流程'}:0;
		$deploy .= $deployTime.",";
		
		my $caseTime=$RptHash{$project}{'CASE流程'} ne '' ? $RptHash{$project}{'CASE流程'}:'0';
		$case .=$caseTime.",";

		my $innerTime=$RptHash{$project}{'内部流程'} ne ''? $RptHash{$project}{'内部流程'}:'0';
		$inner .=$innerTime.",";
	}

	chop $projects;
	chop $dev;
	chop $deploy;
	chop $case;
	chop $inner;

	open(WRITE,">echarts-project-track.cfg");
		print WRITE "data:[".$projects."] \n";
		print WRITE "data:[".$dev."] \n";
		print WRITE "data:[".$deploy."] \n";
		print WRITE "data:[".$case."] \n";
		print WRITE "data:[".$inner."] \n";
	close(WRITE);
}

sub UserTrackerRpt(){
	my ($userid,$username) = ('ALL','Dept');
	my $starttime = getTimeNum();
	print "==============$username 大区月报表 跟踪分类图=========\n";

	my $today=todayNum();

	my $sql="select concat(u.lastname,'',u.firstname) as 'Member',";

	#$sql="select u.id,";
	
	$sql .="tr.name as '跟踪标签',sum(t.hours) as '工时' 
			from issues i ,time_entries t,users u,trackers tr
			 where i.id=t.issue_id and t.user_id=u.id and i.tracker_id=tr.id
			and t.spent_on>=?  and t.spent_on<=? 
			group by u.id,tracker_id
			order by u.id,tr.id";
	my $sth = $dbh->prepare($sql);
	$sth->execute($statday,$finishday);

	print "--------------after execute -----\n";
	my %RptHash;
	while ($ref=$sth->fetchrow_arrayref()) 
	{
		$RptHash{$ref->[0]}{$ref->[1]} = $ref->[2];
	}
	
	print Dumper %RptHash;

	my $author;
	my $dev;
	my $deploy;
    my $case;
	my $inner;

	foreach my $member (sort keys %RptHash)
	{
		$author .= "'".$member."',";

		my $devTime=$RptHash{$member}{'开发流程'} ne '' ? $RptHash{$member}{'开发流程'}:'0';
		$dev .= $devTime.",";

		my $deployTime=$RptHash{$member}{'实施流程'} ne ''?$RptHash{$member}{'实施流程'}:0;
		$deploy .= $deployTime.",";
		
		my $caseTime=$RptHash{$member}{'CASE流程'} ne '' ? $RptHash{$member}{'CASE流程'}:'0';
		$case .=$caseTime.",";

		my $innerTime=$RptHash{$member}{'内部流程'} ne ''? $RptHash{$member}{'内部流程'}:'0';
		$inner .=$innerTime.",";

	}

	chop $author;
	chop $dev;
	chop $deploy;
	chop $case;
	chop $inner;

	open(WRITE,">echarts-user-track.cfg");
		print WRITE "data:[".$author."] \n";
		print WRITE "data:[".$dev."] \n";
		print WRITE "data:[".$deploy."] \n";
		print WRITE "data:[".$case."] \n";
		print WRITE "data:[".$inner."] \n";
	close(WRITE);
}

sub DeptRpt(){
	my ($userid,$username) = ('ALL','Dept');
	my $starttime = getTimeNum();
	print "==============$username 大区月报表=========\n";

	my $today=todayNum();
	my $single_file = "/home/redmine/rptdata/$username-$today-$statday-$finishday.xls";

	my $single_book= Spreadsheet::WriteExcel->new("$single_file");



	my $daysql="select distinct CONCAT(spent_on,'','') as workdate  from time_entries where spent_on>=? and spent_on<=? ORDER BY workdate";
	my $sth = $dbh->prepare($daysql);

	$sth->execute($statday,$finishday);

	my @days;
	my $rownum=0;
	while ( $ref=$sth->fetchrow_arrayref()) 
	{
		#print "fetch data  \n";
		$days[$rownum] = $ref->[0];
		$rownum++;
	}
	
	my $sql="select t.user_id,concat(u.lastname,'',u.firstname) as author,";
	   
	   my $daycount=0;
	   foreach my $daynum (@days) {
		   if($daycount<@days-1){
			   $sql.="SUM((CASE WHEN t.spent_on = '$daynum' THEN t.hours END)) as '$daynum',";
		   }else{
			   $sql.="SUM((CASE WHEN t.spent_on = '$daynum' THEN t.hours END)) as '$daynum' ";
		   }
		   $daycount++;
	   }

	$sql.=" from time_entries t,projects p,issues i,users u,trackers tr,enumerations en";
	$sql.=" where t.project_id=p.id and t.user_id=u.id and t.issue_id=i.id and i.tracker_id=tr.id and t.activity_id=en.id ";
	$sql.=" and t.spent_on>='$statday' "; 
	$sql.=" and t.spent_on<='$finishday' ";
	$sql.=" group by t.user_id ";

	print "$sql \n";
	$sth = $dbh->prepare($sql);
	$sth->execute();

	my %RptHash;
	while ( $ref=$sth->fetchrow_arrayref()) 
	{
		my $datanum=2;
		foreach my $daynum (@days) {
			$RptHash{$ref->[1]}{$daynum}{'hours'} = $ref->[$datanum];
			$datanum++;
		}
		

	}

	#print Dumper %RptHash;

########################################### Print Rpt #####################
	

	#Get Format
	my $TitleFormat		= &SetBookFmt($single_book,"fmt_title");
	my $SubTitleFormat	= &SetBookFmt($single_book,"fmt_subtitle");
	my $HeaderFormat	= &SetBookFmt($single_book,"fmt_coltitle");
	my $HeaderFormat_mg	= &SetBookFmt($single_book,"fmt_coltitle");	
	my $ItemFormat		= &SetBookFmt($single_book,"fmt_item");
	my $ItemFormat_mg	= &SetBookFmt($single_book,"fmt_item");
	my $DataFormt		= &SetBookFmt($single_book,"fmt_data");
	my $DataFormtRed		= &SetBookFmt($single_book,"fmt_data_red");
	my $DataFormtBlue		= &SetBookFmt($single_book,"fmt_data_blue");
	my $DataFormtYellow		= &SetBookFmt($single_book,"fmt_data_yellow");
	my $DataFormtGray		= &SetBookFmt($single_book,"fmt_data_gray");
	my $DataFormt2		= &SetBookFmt($single_book,"fmt_data2");
	my $DataFormt_mg	= &SetBookFmt($single_book,"fmt_data");
	my $FootFormat		= &SetBookFmt($single_book,"fmt_date");

	my $Format;
	$Format->{'title'}		= $TitleFormat;
	$Format->{'subtitle'}	= $SubTitleFormat;
	$Format->{'header'}		= $HeaderFormat;
	$Format->{'header_mg'}	= $HeaderFormat_mg;     
	$Format->{'itemformat'} = $ItemFormat;
	$Format->{'itemformat_mg'} = $ItemFormat_mg;
	$Format->{'dataformt'}	   = $DataFormt;
	$Format->{'dataformtRed'}	   = $DataFormtRed;
	$Format->{'dataformtBlue'}	   = $DataFormtBlue;
	$Format->{'dataformtYellow'}	   = $DataFormtYellow;
	$Format->{'dataformtGray'}	   = $DataFormtGray;
	$Format->{'dataformt2'}	   = $DataFormt2;
	$Format->{'dataformt_mg'}  = $DataFormt_mg;
	$Format->{'foodformat'}    = $FootFormat;

	


	#======================详细页===========================
	
	my $detail_sheet = $single_book->add_worksheet("Dept");

	$detail_sheet->set_column(0,100,15);#0-13列，宽度25
	
	my $rowcounter = 0;
	my $colnum=0;
	#打印报表标题
		$detail_sheet->write($rowcounter,$colnum,'作者',$Format->{'subtitle'});
		$colnum++;
		foreach my $daynum (@days) {
			$detail_sheet->write($rowcounter,$colnum,$daynum,$Format->{'subtitle'});
			$colnum++;
		}

		$detail_sheet->write($rowcounter,$colnum,'总计',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,$colnum+1,'及时性评分',$Format->{'subtitle'});
		
		$rowcounter++;

		foreach my $userid (sort keys %RptHash)
		{
			$detail_sheet->write($rowcounter,0,$userid,$Format->{'dataformt'});
			my $rptcolnum=1;

			my $totalhours=0;
			my $score=100;
			foreach my $daynum (sort keys %{$RptHash{$userid}}) {
				my $workhours=$RptHash{$userid}{$daynum}{'hours'};

				if($workhours eq ''){
					$workhours=0;
				}
				

				my $standhours=$RptHash{'严睿'}{$daynum}{'hours'};

				$totalhours=$totalhours+$workhours;
				
				if($standhours>0){
					if($workhours==0){
						$detail_sheet->write($rowcounter,$rptcolnum,0,$Format->{'dataformtRed'});
						$score=$score-3;
					}
					if($workhours>0&&$workhours<8){
						$detail_sheet->write($rowcounter,$rptcolnum,$workhours,$Format->{'dataformtBlue'});
						$score=$score-1;
					}
					if($workhours>12){
						$detail_sheet->write($rowcounter,$rptcolnum,$workhours,$Format->{'dataformtYellow'});
					}
					else{
						$detail_sheet->write($rowcounter,$rptcolnum,$workhours,$Format->{'dataformt'});
					}
				}else{
					$detail_sheet->write($rowcounter,$rptcolnum,$workhours,$Format->{'dataformt'});
				}

				$rptcolnum++;
			}	
				$detail_sheet->write($rowcounter,$rptcolnum,$totalhours,$Format->{'dataformt'});
				$detail_sheet->write($rowcounter,$rptcolnum+1,$score,$Format->{'dataformt'});
			$rowcounter++;
		}


}

sub MembersRpt(){
	
	#my $sql="select g.user_id as userid,CONCAT(u.lastname,'',u.firstname) as username from groups_users g,users u where g.user_id=u.id and g.group_id=23";#华南大区
	my $sql="select g.user_id as userid,u.login as username from groups_users g,users u where g.user_id=u.id and g.group_id=23";#华南大区
	
	# query
	$sth = $dbh->prepare($sql);
	$sth->execute();


	my %UsersHash;
	my $rownum=0;
	while ($ref=$sth->fetchrow_arrayref()) 
	{
		$UsersHash{$rownum}{'userid'} = $ref->[0];
		$UsersHash{$rownum}{'username'} = $ref->[1];
		$rownum++;
	}
	$sth->finish;

	

	foreach my $rownum (sort keys %UsersHash)
	{
		my $userid=$UsersHash{$rownum}{'userid'};
		my $username=$UsersHash{$rownum}{'username'};
		print "$userid   $username  \n";
		SingleRpt($userid,$username);
	}
}


sub SingleRpt($$){
	my ($userid,$username) = @_;
	my $starttime = getTimeNum();
	print "==============$username 个人报表=========\n";

	my $today=todayNum();
	my $single_file = "/home/redmine/rptdata/$username-$today.xls";
	my $single_book= Spreadsheet::WriteExcel->new("$single_file");

	#=================汇总图表页============================
	my $rpt_sheet = $single_book->add_worksheet("$username");

	#=================详细数据页============================
	exportWorkSheet($userid,$username,'detail',$single_book);
	exportWorkSheet($userid,$username,'develop',$single_book);
	exportWorkSheet($userid,$username,'deploy',$single_book);
	exportWorkSheet($userid,$username,'case',$single_book);
	exportWorkSheet($userid,$username,'inner',$single_book);

	
}

sub exportWorkSheet($$$$){
	my ($userid,$username,$sheetname,$single_book) = @_;
	my $starttime = getTimeNum();

	$statement = "select p.`name` as pname,tr.`name` as tname,
			concat(u.lastname,'',u.firstname) as uname,EN.name as activename,
			CONCAT(t.hours,'','') as hours,
			CONCAT(t.spent_on,'','') as day,DATE_FORMAT(t.spent_on,'%m') as month,
			week(t.spent_on)as week,iss.`name` as issname,
			(select value from custom_values where customized_type='Issue' and customized_id=i.id and custom_field_id=25) as caselevel,
			(select value from custom_values where customized_type='Issue' and customized_id=i.id and custom_field_id=19) as casetype,
			(select value from custom_values where customized_type='Issue' and customized_id=i.id and custom_field_id=13) as casemoudle,
			(select value from custom_values where customized_type='Issue' and customized_id=i.id and custom_field_id=20) as casereason,
			(select value from custom_values where customized_type='Issue' and customized_id=i.id and custom_field_id=15) as caserequest,
			i.`subject`,t.comments
		from time_entries t,projects p,issues i,users u,trackers tr,enumerations en,issue_statuses iss
		where t.project_id=p.id and t.user_id=u.id 		 and t.issue_id=i.id 		and i.tracker_id=tr.id 
		and i.status_id=iss.id	and t.activity_id=en.id  and t.spent_on>=?
		and t.spent_on<=?	and t.user_id=?  ";

		if($sheetname eq "detail"){
			#=======all tracker id 
		}
		else{
			$statement.=" and i.tracker_id=? ";
		}

	$statement.=" order by t.project_id,t.user_id,t.spent_on ";

	print "$statement \n";
	print "parameters:statday=$statday  finishday=$finishday  userid=$userid (username:$username)\n";

	my $sth = $dbh->prepare($statement);

	my $trackerid;

	if($sheetname eq "develop"){
		$trackerid='2';
	}
	if($sheetname eq "deploy"){
		$trackerid='14';
	}
	if($sheetname eq "case"){
		$trackerid='12';
	}
	if($sheetname eq "inner"){
		$trackerid='15';
	}

	
		if($trackerid ne ''){
			$sth->execute($statday,$finishday,$userid,$trackerid);
		}else{
			$sth->execute($statday,$finishday,$userid);
		}		

	my %SingleRptHash;
	
	my $rownum=0;
	while ( $ref=$sth->fetchrow_arrayref()) 
	{
		#print "fetch data  \n";
		$SingleRptHash{$rownum}{'project'} = $ref->[0];
		$SingleRptHash{$rownum}{'tracker'} = $ref->[1];
		$SingleRptHash{$rownum}{'author'} = $ref->[2];
		$SingleRptHash{$rownum}{'active'} = $ref->[3];
		$SingleRptHash{$rownum}{'hours'} = $ref->[4];
		$SingleRptHash{$rownum}{'workday'} = $ref->[5];
		$SingleRptHash{$rownum}{'workmonth'} = $ref->[6];
		$SingleRptHash{$rownum}{'workweek'} = $ref->[7];
		$SingleRptHash{$rownum}{'issuestat'} = $ref->[8];
		$SingleRptHash{$rownum}{'caselevel'} = $ref->[9];
		$SingleRptHash{$rownum}{'casetype'} = $ref->[10];
		$SingleRptHash{$rownum}{'casemoudle'} = $ref->[11];
		$SingleRptHash{$rownum}{'casereason'} = $ref->[12];
		$SingleRptHash{$rownum}{'caserequest'} = $ref->[13];
		$SingleRptHash{$rownum}{'subject'} = $ref->[14];
		$SingleRptHash{$rownum}{'issuecomments'} = $ref->[15];
		
		$rownum++;
	}
	$sth->finish;

	#print Dumper %SingleRptHash;

########################################### Print Rpt #####################
	

	#Get Format
	my $TitleFormat		= &SetBookFmt($single_book,"fmt_title");
	my $SubTitleFormat	= &SetBookFmt($single_book,"fmt_subtitle");
	my $HeaderFormat	= &SetBookFmt($single_book,"fmt_coltitle");
	my $HeaderFormat_mg	= &SetBookFmt($single_book,"fmt_coltitle");	
	my $ItemFormat		= &SetBookFmt($single_book,"fmt_item");
	my $ItemFormat_mg	= &SetBookFmt($single_book,"fmt_item");
	my $DataFormt		= &SetBookFmt($single_book,"fmt_data");
	my $DataFormt2		= &SetBookFmt($single_book,"fmt_data2");
	my $DataFormt_mg	= &SetBookFmt($single_book,"fmt_data");
	my $FootFormat		= &SetBookFmt($single_book,"fmt_date");

	my $Format;
	$Format->{'title'}		= $TitleFormat;
	$Format->{'subtitle'}	= $SubTitleFormat;
	$Format->{'header'}		= $HeaderFormat;
	$Format->{'header_mg'}	= $HeaderFormat_mg;     
	$Format->{'itemformat'} = $ItemFormat;
	$Format->{'itemformat_mg'} = $ItemFormat_mg;
	$Format->{'dataformt'}	   = $DataFormt;
	$Format->{'dataformt2'}	   = $DataFormt2;
	$Format->{'dataformt_mg'}  = $DataFormt_mg;
	$Format->{'foodformat'}    = $FootFormat;

	


	#======================详细页===========================
	
	my $detail_sheet = $single_book->add_worksheet("$sheetname");

	$detail_sheet->set_column(0,13,25);#0-13列，宽度25
	$detail_sheet->set_column(14,16,60);#14列 说明 宽度60
	
	my $rowcounter = 0;
		
	#打印报表标题
		$detail_sheet->write($rowcounter,0,'项目',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,1,'跟踪标签',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,2,'作者',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,3,'活动',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,4,'工时',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,5,'日期',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,6,'月份',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,7,'周',$Format->{'subtitle'});

	if($sheetname eq "develop"){
		$detail_sheet->write($rowcounter,8,'任务',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,9,'任务状态',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,10,'说明',$Format->{'subtitle'});
	}
	if($sheetname eq "deploy"){
		$detail_sheet->write($rowcounter,8,'任务',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,9,'任务状态',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,10,'说明',$Format->{'subtitle'});
	}
	if($sheetname eq "case"){
		$detail_sheet->write($rowcounter,8,'任务',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,9,'任务状态',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,10,'CASE等级',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,11,'CASE类别',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,12,'模块',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,13,'归属原因',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,14,'申告人',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,15,'说明',$Format->{'subtitle'});
	}
	if($sheetname eq "inner"){
		$detail_sheet->write($rowcounter,8,'任务',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,9,'任务状态',$Format->{'subtitle'});
	}
	if($sheetname eq "detail"){
		$detail_sheet->write($rowcounter,8,'任务',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,9,'任务状态',$Format->{'subtitle'});
		$detail_sheet->write($rowcounter,10,'说明',$Format->{'subtitle'});
	}

		

		$rowcounter++;

	foreach my $rownum (sort keys %SingleRptHash)
	{
		$detail_sheet->write($rowcounter,0,$SingleRptHash{$rownum}{'project'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,1,$SingleRptHash{$rownum}{'tracker'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,2,$SingleRptHash{$rownum}{'author'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,3,$SingleRptHash{$rownum}{'active'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,4,$SingleRptHash{$rownum}{'hours'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,5,$SingleRptHash{$rownum}{'workday'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,6,$SingleRptHash{$rownum}{'workmonth'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,7,$SingleRptHash{$rownum}{'workweek'},$Format->{'dataformt'});


	if($sheetname eq "develop"){
		$detail_sheet->write($rowcounter,8,$SingleRptHash{$rownum}{'subject'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,9,$SingleRptHash{$rownum}{'issuestat'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,10,$SingleRptHash{$rownum}{'issuecomments'},$Format->{'dataformt'});
	}
	if($sheetname eq "deploy"){
		$detail_sheet->write($rowcounter,8,$SingleRptHash{$rownum}{'subject'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,9,$SingleRptHash{$rownum}{'issuestat'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,10,$SingleRptHash{$rownum}{'issuecomments'},$Format->{'dataformt'});
	}
	if($sheetname eq "case"){
		$detail_sheet->write($rowcounter,8,$SingleRptHash{$rownum}{'subject'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,9,$SingleRptHash{$rownum}{'issuestat'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,10,$SingleRptHash{$rownum}{'caselevel'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,11,$SingleRptHash{$rownum}{'casetype'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,12,$SingleRptHash{$rownum}{'casemoudle'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,13,$SingleRptHash{$rownum}{'casereason'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,14,$SingleRptHash{$rownum}{'caserequest'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,15,$SingleRptHash{$rownum}{'issuecomments'},$Format->{'dataformt'});
	}
	if($sheetname eq "inner"){
		$detail_sheet->write($rowcounter,8,$SingleRptHash{$rownum}{'subject'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,9,$SingleRptHash{$rownum}{'issuestat'},$Format->{'dataformt'});
	}
	if($sheetname eq "detail"){
		$detail_sheet->write($rowcounter,8,$SingleRptHash{$rownum}{'subject'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,9,$SingleRptHash{$rownum}{'issuestat'},$Format->{'dataformt'});
		$detail_sheet->write($rowcounter,10,$SingleRptHash{$rownum}{'issuecomments'},$Format->{'dataformt'});
	}

		$rowcounter++;		
	}


	my $endtime = getTimeNum();
	my $consume=$endtime-$starttime;
	print "==============$username 个人报表==$sheetname===结束  $starttime~$endtime  耗时:$consume ====\n";
}



sub PushTarget($$){
		my ($localfile,$remotefile) = @_;
		`mv $localfile $remotefile `;
}

sub LastMonthsNum($) {
		my ($num)=@_;
		
		my $i=0;

		my $months;

		while($i<$num){
			my ( $d,$m,$y ) = (localtime(time()))[3,4,5];
			$y += 1900;
			$m ++;
			$m=$m-$num;
			my $datestr = sprintf("%4d-%02d",$y,$m,$d);
			$months .=$datestr.",";
			$num--;
		}

		chop $months;

		return $months;
}


sub thisYear {
	my ( $d,$m,$y ) = (localtime(time()))[3,4,5];
	$y += 1900;
	$m ++;
	return sprintf("%4d",$y,$m,$d);
}

sub todayNum {
	my ( $d,$m,$y ) = (localtime(time()))[3,4,5];
	$y += 1900;
	$m ++;
	return sprintf("%4d%02d%02d",$y,$m,$d);
}

sub getTimeNum{
	my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime(time);
    my $today = sprintf("%04d%02d%02d%02d%02d%02d", $year+1900, $mon+1, $mday, $hour, $min);
	return $today;
}

sub yesterdayNum {
		my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime(time-24*3600);
        my $datestr = sprintf("%04d%02d%02d", $year+1900, $mon+1, $mday, $hour, $min);
		return  $datestr;
}

