#!/usr/local/bin/perl
use strict;
use DBI;
use GetSHDir;
use Data::Dumper;
use Spreadsheet::ParseExcel;
use Spreadsheet::WriteExcel;
use Net::FTP;
use Encode;

################################################################
#作者：严睿
#
#创建时间：2014-07-29
#
#Redmine统计分析报表
#
################################################################

#实时调用参数
my $para='';

##实时调用检验参数
if(@ARGV > 0){	
	$para = $ARGV[0];		
}
my $SetupDir=GetSHDir("SetupDir");  


#实时调用参数
my $today='';

##实时调用检验参数
if(@ARGV > 0){	
	$today = $ARGV[0];		
}else{
	$today = todayNum();		
}

if($SetupDir < 0){
    my $Detail ="Can not open properties file  for get SetupDir\n";
    print "$Detail";
    $SetupDir="/slview/nms/";
}

### 使用lib函数连接数据库
unshift (@INC,"$SetupDir/lib/");
require ("SetBookFmt.pl");#报表格式库

my $tmptime = getTimeNum();

my $statday='2014-04-01';
my $finishday='2014-06-30';

print "Redmine 统计分析==$tmptime====\n";



&SingleRpt('1','严睿');




sub SingleRpt($$){
	my ($userid,$username) = @_;
	my $starttime = getTimeNum();
########################################### Print Rpt #####################
	my $today=todayNum();
	my $single_file = "/slview/test/yanrui/$username-$today.xls";
	my $single_book= Spreadsheet::WriteExcel->new("$single_file");

print "=============before add_worksheet ================\n";


#my $detail_sheet = $single_book->add_worksheet(decode("gb2312","详细"));

	my $detail_sheet = $single_book->add_worksheet("详细");

	$detail_sheet->set_column(0,10,25);

print "=============before SetBookFmt ================\n";
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

	my $totalcounter = 0;
	my $rowcounter = 0;

		print "=============before print title================\n";
	#打印报表标题
		#$detail_sheet->write($rowcounter,0,'项目',$Format->{'subtitle'});

		$detail_sheet->write($rowcounter,1,decode("gb2312",'跟踪标签'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,2,decode("gbk",'作者'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,3,decode("gbk",'活动'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,4,decode("gbk",'工时'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,5,decode("gbk",'日期'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,6,decode("gbk",'月份'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,7,decode("gbk",'周'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,8,decode("gbk",'任务状态'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,9,decode("gbk",'CASE等级'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,10,decode("gbk",'CASE类别'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,11,decode("gbk",'模块'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,12,decode("gbk",'归属原因'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,13,decode("gbk",'申告人'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,14,decode("gbk",'说明'),$Format->{'subtitle'});

		$rowcounter++;

print "=============before foreach rpt rows================\n";



	my $endtime = getTimeNum();
	my $consume=$endtime-$starttime;
	print "==============$username 个人报表=====结束  $starttime~$endtime  耗时:$consume  $totalcounter====\n";
}



sub PushTarget($$){
		my ($localfile,$remotefile) = @_;
		`mv $localfile $remotefile `;
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