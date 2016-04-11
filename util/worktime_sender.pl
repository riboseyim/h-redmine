#!/usr/bin/perl -w
########################################################################################
#
# 自动汇总当前时间和上周的Redmine工时，并发邮件到总部ss-support-log@iteview.com邮箱
#
########################################################################################

use strict;
use warnings;
use utf8;
use DBI;
use POSIX qw(strftime);
use Mail::Sender;
use FindBin qw($Bin);

# utf-8
binmode(STDIN, ':encoding(utf8)');
binmode(STDOUT, ':encoding(utf8)');
binmode(STDERR, ':encoding(utf8)');

# file constant
my $line_separator = "\r\n";

# database config
my $host = "localhost";
my $port = 3311;
my $database = "bitnami_redmine";
my $socket = "/slview/redmine2/mysql/tmp/mysql.sock";
my $data_source = "DBI:mysql:$database;host=$host;port=$port;mysql_socket=$socket";
my $username = "bitnami";
my $password = "fc862b57a1";

# connect db
my $dbh = DBI->connect($data_source, $username, $password) or die $DBI::errstr;

# db connect config
$dbh->{"mysql_auto_reconnect"} = 1;
$dbh->{"AutoCommit"} = 0;
$dbh->{"mysql_enable_utf8"} = 1;
$dbh->do("set character_set_client=utf8");
$dbh->do("set character_set_connection=utf8");
$dbh->do("set character_set_results=utf8");
$dbh->do("set names utf8");

# query
my $sql=<<"SQL";
select
date_format(t.spent_on,'%Y%m%d') as log_id,
concat(u.lastname,u.firstname) as person_name,
date_format(t.spent_on,'%Y-%m-%d') as log_date,
concat(p.name,ifnull(v.name,'')) as project_name,
if(tr.name<>'CASE流程','计划','突发') as log_type,
if(tr.name<>'CASE流程','自己发起','客户发起') as log_source,
ifnull(s.value,'') as case_customer,
if (i.done_ratio=100,'完成','没完成') as log_complete,
concat(e.name,'-',ifnull(m.value,'无'),'-无') as log_attr,
concat(i.subject,t.comments) as log_desc,
t.hours as worktime,
date_format(t.updated_on,'%Y-%m-%d') as commit_date
from time_entries t
left join projects p on p.id=t.project_id
left join issues i on i.id=t.issue_id
left join versions v on v.project_id=p.id and v.id=i.fixed_version_id
left join users u on u.id=t.user_id
left join trackers tr on tr.id=i.tracker_id
left join enumerations e on e.id=t.activity_id and e.active=1
left join (
	select i.id,i.subject,cf.name,cv.value from custom_fields cf
	left join custom_values cv on cv.custom_field_id=cf.id
	left join issues i on i.id=cv.customized_id
	where cf.type='IssueCustomField' and cf.name='网管模块'
) m on m.id=i.id
left join (
	select i.id,i.subject,cf.name,cv.value from custom_fields cf
	left join custom_values cv on cv.custom_field_id=cf.id
	left join issues i on i.id=cv.customized_id
	where cf.type='IssueCustomField' and cf.name='申告人'
) s on s.id=i.id
where t.spent_on>=? and t.spent_on<=?
order by t.spent_on,person_name,project_name
SQL

# sql param
my $now = strftime("%Y-%m-%d", localtime(time));
my $lastweek = strftime("%Y-%m-%d", localtime(time() - 60*60*24*6));
my $start_date = $lastweek;
my $end_date = $now;

# query
my $sth = $dbh->prepare($sql);
$sth->execute($start_date, $end_date);

# output with gbk
my %map = ();
my $key = '';
my $value = '';
my $logid = '';
my $filename = "中盈优创华南大区工时汇总($start_date~$end_date).csv";
my $filepath = "$Bin/$filename";
open(my $fh_csv, ">:encoding(gbk)", $filepath) or die "Could not open file '$filename' $!";
print $fh_csv "日志序号,提交人,日志日期,项目名称,日志分类,日志来源,申告用户,日志状态,日志属性,日志描述,工时,提交日期$line_separator";
while (my $ref = $sth->fetchrow_hashref()){

	$key =  "$ref->{log_id}"."$ref->{person_name}";
	if (exists $map{$key}){
		$map{$key} += 1;
	} else {
		$map{$key} = 1;
	}
	$value = $map{$key};
	$logid = $ref->{log_id} . sprintf("%02s", $value);
#	print "$key=>$value=>$logid\n";
	print $fh_csv "\"$logid\",";		
	print $fh_csv "\"$ref->{person_name}\",";
	print $fh_csv "\"$ref->{log_date}\",";
	print $fh_csv "\"$ref->{project_name}\",";
	print $fh_csv "\"$ref->{log_type}\",";
	print $fh_csv "\"$ref->{log_source}\",";
	print $fh_csv "\"$ref->{case_customer}\",";
	print $fh_csv "\"$ref->{log_complete}\",";
	print $fh_csv "\"$ref->{log_attr}\",";
	print $fh_csv "\"$ref->{log_desc}\",";
	print $fh_csv "\"$ref->{worktime}\",";
	print $fh_csv "\"$ref->{commit_date}\"";
	print $fh_csv "$line_separator";
}
close($fh_csv) or die "Cann't close csv!";

# dis connect db
$sth->finish();
$dbh->disconnect();

# mail config
my $smtp_server = "smtp.163.com";
my $smtp_user = 'unihub_huanan@163.com';
my $smtp_password = "huananredmine";
my $from = $smtp_user;
my $to = 'ss-support-log@iteview.com';
my $cc = 'liubh@zhong-ying.com';
#my $cc = 'dongchen@zhong-ying.com,guoning@zhong-ying.com,hegs@zhong-ying.com,huangbiao@zhong-ying.com,linwei@zhong-ying.com,liubh@zhong-ying.com,liyf@zhong-ying.com,lvjw@zhong-ying.com,niesm@zhong-ying.com,songlp@zhong-ying.com,tengcr@zhong-ying.com,yangjz@zhong-ying.com,yanrui@zhong-ying.com,zhangdong@zhong-ying.com,zhangnf@zhong-ying.com,zhangwei@zhong-ying.com,zhangxy@zhong-ying.com,zhangyi@zhong-ying.com,zhenglong@zhong-ying.com,zhongxiao@zhong-ying.com,zhouyang@zhong-ying.com';
my $subject = "中盈优创华南大区工时汇总($start_date~$end_date)";

# send email
my $sender = new Mail::Sender {
	smtp => $smtp_server,
	auth => 'LOGIN',
	authid => $smtp_user,
	authpwd => $smtp_password,
	ctype => 'text/plain; charset=utf-8',
	encoding => 'utf-8'
} or die "$Mail::Sender::Error\n";

$sender->OpenMultipart({
	from => $from,
	to => $to,
	cc => $cc,
	subject => $subject
});

$sender->Body;
$sender->SendEnc(<<'*END*');
大家好！

中盈优创华南大区工时汇总，详见附件。



——自发自Redmine系统，请勿回复。
*END*

$sender->Attach({
	description => 'Perl module Mail::Sender.pm',
	ctype => 'text/csv',
	encoding => 'Base64',
	disposition => "attachment; filename=\"$filename\"",
	file => $filepath
});

$sender->Close;

