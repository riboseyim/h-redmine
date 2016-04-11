#!/usr/local/bin/perl -w

use Encode;
use utf8;
use open ':encoding(utf8)';
binmode(STDIN, ':encoding(utf8)');
binmode(STDOUT, ':encoding(utf8)');
binmode(STDERR, ':encoding(utf8)');

sub SetBookFmt($$)
{
	my ($dest_book,$FmtFlag,$NumFlag);
	($dest_book,$FmtFlag,$NumFlag)=@_;

	if($FmtFlag eq 'fmt_title')
	{
		my $title = $dest_book->add_format();
		$title->set_properties(bold => 1);
		$title->set_font('幼圆');
		$title->set_size(14);
		$title->set_align('center');
		$title->set_align('top');

		if ($NumFlag==1) {
			$title->set_num_format('00');
		}
		return $title;
	}
	elsif($FmtFlag eq 'fmt_subtitle')
	{
		my $subtitle = $dest_book->add_format();
		$subtitle->set_properties(bold => 1);
		$subtitle->set_font('华文细黑');
		$subtitle->set_size(10);
		$subtitle->set_align('center');
		$subtitle->set_align('vcenter');
		$subtitle->set_text_wrap();

		if ($NumFlag==1) {
			$subtitle->set_num_format('00');
		}
		return $subtitle;
	}
	elsif($FmtFlag eq 'fmt_coltitle')
	{
		my $coltitle = $dest_book->add_format();
		$coltitle->set_border(1);
		$coltitle->set_align('center');
		$coltitle->set_align('top');
		$coltitle->set_properties(bold => 1);
		$coltitle->set_font('幼圆');
		$coltitle->set_size(12);
		$coltitle->set_color(1);
		$coltitle->set_pattern();
		$coltitle->set_fg_color($dest_book->set_custom_color(20, 79, 129, 189));
		$coltitle->set_merge(0);
		$coltitle->set_text_wrap();

		if ($NumFlag==1) {
			$coltitle->set_num_format('00');
		}
		return $coltitle;
	}
	elsif($FmtFlag eq 'fmt_coltitlem')
	{
		my $coltitle = $dest_book->add_format();
		$coltitle->set_border(1);
		$coltitle->set_align('center');
		$coltitle->set_align('top');
		$coltitle->set_properties(bold => 1);
		$coltitle->set_font('幼圆');
		$coltitle->set_size(12);
		$coltitle->set_color(1);
		$coltitle->set_pattern();
		$coltitle->set_fg_color($dest_book->set_custom_color(20, 79, 129, 189));
		#$coltitle->set_merge(0);
		$coltitle->set_text_wrap();

		if ($NumFlag==1) {
			$coltitle->set_num_format('00');
		}
		return $coltitle;
	}
	elsif($FmtFlag eq 'fmt_item')
	{
		my $item = $dest_book->add_format();
		$item->set_border(1);
		$item->set_align('center');
		$item->set_align('vcenter');
		$item->set_properties(bold => 0);
		$item->set_font('微软雅黑');
		$item->set_size(10);
		$item->set_pattern();
		$item->set_fg_color($dest_book->set_custom_color(21, 219, 229, 241));
		$item->set_text_wrap();
		$item->set_merge(0);

		if ($NumFlag==1) {
			$item->set_num_format('00');
		}
		return $item;
	}
	elsif($FmtFlag eq 'fmt_date')
	{
		my $date = $dest_book->add_format();
		$date->set_align('left'); 
		$date->set_font('微软雅黑');
		$date->set_size(9);
		return $date;
	}
	elsif($FmtFlag eq 'fmt_data')
	{
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');
		$data->set_text_wrap();
		#$data->set_font('微软雅黑');
		$data->set_size(9);
		
		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	}elsif($FmtFlag eq 'fmt_data_red')
	{
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');
		
		$data->set_bg_color('red');
		
		$data->set_text_wrap();
		#$data->set_font('微软雅黑');
		$data->set_size(9);
		
		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	}
	elsif($FmtFlag eq 'fmt_data_blue')
	{
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');

		$data->set_bg_color('blue');

		$data->set_text_wrap();
		#$data->set_font('微软雅黑');
		$data->set_size(9);
		
		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	}
	elsif($FmtFlag eq 'fmt_data_yellow')
	{
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');
		$data->set_text_wrap();


		$data->set_bg_color('yellow');

		#$data->set_font('微软雅黑');
		$data->set_size(9);
		
		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	}
	elsif($FmtFlag eq 'fmt_data_gray')
	{
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');
		$data->set_text_wrap();


		$data->set_bg_color('gray');


		#$data->set_font('微软雅黑');
		$data->set_size(9);
		
		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	}
	else{
		# by lgw 20050716
		my $data = $dest_book->add_format();
		$data->set_border(1);
		$data->set_align('center');
		$data->set_align('vcenter');
		#$data->set_font('微软雅黑');
		$data->set_size(9);
		if ($FmtFlag =~ /(\d+)W/) {
			$data->set_color($1);
		}
		else{
			if ( $FmtFlag eq 'red' ) { 
				$data->set_fg_color($dest_book->set_custom_color(19, 255, 80, 80));
			}
			else {
				$data->set_fg_color( $FmtFlag );
			}
		}
		$data->set_text_wrap();

		if ($NumFlag==1) {
			$data->set_num_format('00');
		}
		return $data;
	
    }
}
1;

