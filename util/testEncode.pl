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
#���ߣ����
#
#����ʱ�䣺2014-07-29
#
#Redmineͳ�Ʒ�������
#
################################################################

#ʵʱ���ò���
my $para='';

##ʵʱ���ü������
if(@ARGV > 0){	
	$para = $ARGV[0];		
}
my $SetupDir=GetSHDir("SetupDir");  


#ʵʱ���ò���
my $today='';

##ʵʱ���ü������
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

### ʹ��lib�����������ݿ�
unshift (@INC,"$SetupDir/lib/");
require ("SetBookFmt.pl");#�����ʽ��

my $tmptime = getTimeNum();

my $statday='2014-04-01';
my $finishday='2014-06-30';

print "Redmine ͳ�Ʒ���==$tmptime====\n";



&SingleRpt('1','���');




sub SingleRpt($$){
	my ($userid,$username) = @_;
	my $starttime = getTimeNum();
########################################### Print Rpt #####################
	my $today=todayNum();
	my $single_file = "/slview/test/yanrui/$username-$today.xls";
	my $single_book= Spreadsheet::WriteExcel->new("$single_file");

print "=============before add_worksheet ================\n";


#my $detail_sheet = $single_book->add_worksheet(decode("gb2312","��ϸ"));

	my $detail_sheet = $single_book->add_worksheet("��ϸ");

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
	#��ӡ�������
		#$detail_sheet->write($rowcounter,0,'��Ŀ',$Format->{'subtitle'});

		$detail_sheet->write($rowcounter,1,decode("gb2312",'���ٱ�ǩ'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,2,decode("gbk",'����'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,3,decode("gbk",'�'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,4,decode("gbk",'��ʱ'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,5,decode("gbk",'����'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,6,decode("gbk",'�·�'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,7,decode("gbk",'��'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,8,decode("gbk",'����״̬'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,9,decode("gbk",'CASE�ȼ�'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,10,decode("gbk",'CASE���'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,11,decode("gbk",'ģ��'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,12,decode("gbk",'����ԭ��'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,13,decode("gbk",'�����'),$Format->{'subtitle'});
#		$detail_sheet->write($rowcounter,14,decode("gbk",'˵��'),$Format->{'subtitle'});

		$rowcounter++;

print "=============before foreach rpt rows================\n";



	my $endtime = getTimeNum();
	my $consume=$endtime-$starttime;
	print "==============$username ���˱���=====����  $starttime~$endtime  ��ʱ:$consume  $totalcounter====\n";
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