#!/usr/local/bin/perl
use DBI;
use GetSHDir;
use Time::Local;
use strict;
use Data::Dumper;

#######################
#Redmine平台
#日志分析工具
#@author:严睿
#@from: 2014-04-25
########################

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


#my $processfile = $ARGV[0];
#if($processfile eq "")
#{
#	print "No Argument input..check it...\n";
#	exit -1;
#}


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


	my $subject;
	my $thisTime=getTimeNum();
	my $subjectlog="subject-$thisTime.log";

	$statement = "select subject from issues where 1=1
	and UNIX_TIMESTAMP('2014-04-01 00:00:00') < UNIX_TIMESTAMP(updated_on) 
	and UNIX_TIMESTAMP('2014-04-29 00:00:00') > UNIX_TIMESTAMP(updated_on)";

	$sth = $dbh->prepare($statement);
	$sth->execute();

	open(WRITE,">$subjectlog");
	while ( $ref=$sth->fetchrow_arrayref() ) 
	{
		$subject = $ref->[0];
		print WRITE "$subject \n";
	}
	close(WRITE);
	$sth->finish;	
	

	
	
$dbh->disconnect();
exit 0;


sub getTimeNum{
	my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime(time);
    my $today = sprintf("%04d%02d%02d%02d%02d%02d", $year+1900, $mon+1, $mday, $hour, $min);
	return $today;
}