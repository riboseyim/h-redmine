package com.zhongying.huanan.product.redmine.test;

public class UTimeTest {

	public static void main(String[] args) {
			test2();
	}

	public static String convertDate(String timestampString, String formats) {
		Long timestamp = Long.parseLong(timestampString) * 1000;
		String date = new java.text.SimpleDateFormat(formats).format(new java.util.Date(timestamp));
		return date;
	}
	

	public static void test2() {

		int Interval = 900;

		int a = 1432285200;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432286100;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432287000;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432287900;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);
		a = 1432288800;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

	}

	public static void test1() {

		int Interval = 600;

		int a = 1432285200;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432284900;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432284600;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432285300;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);
		a = 1432285000;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		a = 1432283700;
		System.out.println(convertDate(a + "", "yyyy-MM-dd hh:mm:ss"));
		System.out.println(a % Interval);

		// 1432283700 161 2248 262 2424
		// 1432283400 262 2424 262 2424
		// 1432283100 262 2424 262 2424
		// 1432282800 303 3816 2742 85988
		// 1432282500 2742 85988 2742 85988
		// 1432282200 2742 85988 2742 85988
		// 1432281900 2748 85906 3115 85988
		// 1432281600 3115 81085 3115 81085
		// 1432281300 3115 81085 3115 81085
	}

}
