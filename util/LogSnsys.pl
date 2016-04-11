#!/usr/local/bin/perl
use DBI;
use GetSHDir;
use Time::Local;
use strict;
use Data::Dumper;
my ($dbh,$statement,$sth,$ref);
my $SetupDir=GetSHDir("SetupDir");  
if($SetupDir < 0)
{
    my $Detail ="Can not open properties file  for get SetupDir\n";
    $SetupDir="/slview/nms/";
}
unshift (@INC,"$SetupDir/lib/");
require ("CommonPub.pl");
require ("Debug.pl");
my $processfile = $ARGV[0];
if($processfile eq "")
{
	print "No Argument input..check it...\n";
	exit -1;
}
#$ENV{NLS_LANG} = "SIMPLIFIED CHINESE_CHINA.ZHS16GBK";
#print "$mysqldb\t$mysqluser\t$mysqlpsw\n";
my $mysqldb  = "bitnami_redmine:127.0.0.1:3311";
my $mysqluser  = "bitnami";
my $mysqlpsw = "fc862b57a1";
$dbh =DBI->connect("dbi:mysql:$mysqldb;mysql_local_infile=1", $mysqluser,$mysqlpsw);
	
if ( !defined $dbh )
{
		my $Detail="$0 Cannot connect: $DBI::errstr\n";
		print "$Detail\n";
		exit(-1);
}
print "Connect to the data base success...\n";
#$dbh->do("set names utf8");
#$dbh->do("set names utf8");
$dbh->do("SET character_set_client = 'gbk'");
$dbh->do("SET character_set_connection = 'gbk'");
$dbh->do("SET character_set_results= 'gbk'");
my $status_id = 24;
my $priority_id = 5;
my $author_id = 10;
my $done_ratio = 100;
my $activity_id = 21;
my %projecthash;
my %trackerhash;
@projecthash{qw(广东电信IP网管 ECIS信息平台 开发框架 集约化运维方案 公共知识库 中盈 BrainStorm_Labs 广西电信IP网管 城域网流量预测 网管移动终端 广东铁通IP网管 国际公司IPSEC 广西现场 广西电信PON网管 广西联通IP网管 广西电信测速平台 广西联通测速平台 广西联通DCN网管 广东电信IDC网管 陕西现场 广东现场 陕西电信IP网管 陕西联通测速平台 广西电信DACS 广西电信智能提速平台 广西广电IP网管 四川现场 福建现场 福建电信IP网管 )} = ('1','2','3','4','7','10','12','13','14','15','16','17','21','22','23','24','25','26','27','28','29','30','31','32','33','35','36','37','38');
@trackerhash{qw(开发 工程 专项工作 会议交流 代维 故障报告 )} = ('2','6','8','10','11','12');
open(READ,"<$processfile");
while(my $line = <READ>)
{
	$line=~s/^\s*|\s*$//g;
	my @tmparray = split(/;;/,$line);
	my $date = $tmparray[0];
	my $tyear = substr($date,0,4);
	my $tmonth = substr($date,4,2);
	my $m_time = ParseTimeString($date) ;
	my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime($m_time);
	my $tweek = int($yday/7);
	$date = substr($date,0,4).'-'.substr($date,4,2).'-'.substr($date,6,2);
	my $projectid = $projecthash{$tmparray[1]};
	my $coltypeid = $trackerhash{$tmparray[2]};
	my $subject = $tmparray[3];
	my $fucktime = $tmparray[4];
	my $issueid;
	my $timeentryid;
	my $rootid;
	#获取issueid;
	$statement = "select max(id) from issues";
	$sth = $dbh->prepare($statement);
	$sth->execute();
	while ( $ref=$sth->fetchrow_arrayref() ) 
	{
		$issueid = $ref->[0];
		last;
	}
	$sth->finish;
	$issueid = $issueid +1;
	$rootid = $issueid;
	$statement = "insert into issues (id,tracker_id,project_id,subject,description,due_date,status_id,priority_id,author_id,created_on,updated_on,start_date,done_ratio,root_id,lft,rgt) VALUES ('$issueid','$coltypeid','$projectid','$subject','$subject','$date','$status_id','$priority_id','$author_id',now(),now(),'$date','$done_ratio','$rootid','1','2')";
	print "##$statement\n";
	$sth = $dbh->prepare($statement);
	$sth->execute();
	$sth->finish;
	#获取timeentryid;
	$statement = "select max(id) from time_entries";
	$sth = $dbh->prepare($statement);
	$sth->execute();
	while ( $ref=$sth->fetchrow_arrayref() ) 
	{
		$timeentryid = $ref->[0];
		last;
	}
	$sth->finish;
	$timeentryid = $timeentryid +1;
	$statement = "insert into time_entries (id,project_id,user_id,issue_id,hours,activity_id,spent_on,tyear,tmonth,tweek,created_on,updated_on) VALUES ('$timeentryid','$projectid','$author_id','$issueid','$fucktime','$activity_id','$date','$tyear','$tmonth','$tweek',now(),now())";
	print "##$statement\n";
	$sth = $dbh->prepare($statement);
	$sth->execute();
	$sth->finish;
}
close(READ);

$dbh->disconnect();
exit 0;