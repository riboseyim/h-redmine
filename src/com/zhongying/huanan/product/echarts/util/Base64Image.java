package com.zhongying.huanan.product.echarts.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


public class Base64Image {
	public static void main(String[] args) {
		// ���Դ�Base64����ת��ΪͼƬ�ļ�

		String strImg = "aaaaaa";
		String imagePath = "E:\\IMG_1141.jpg";
		//ConvertEChartsImage(strImg, imagePath);

		// ���Դ�ͼƬ�ļ�ת��ΪBase64����
		System.out.println(GetImageStr(imagePath));

	}

	public static void ConvertEChartsImage(String imgStr, String imgFilePath) {
		if (imgStr == null) // ͼ������Ϊ��
			return;
		
		
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64����
			byte[] bytes = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < bytes.length; ++i) {
				if (bytes[i] < 0) {// �����쳣����
					bytes[i] += 256;
				}
			}
			// ����jpegͼƬ
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(bytes);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static String GetImageStr(String imgFilePath) {// ��ͼƬ�ļ�ת��Ϊ�ֽ������ַ��������������Base64���봦��
		byte[] data = null;

		// ��ȡͼƬ�ֽ�����
		try {
			InputStream in = new FileInputStream(imgFilePath);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// ���ֽ�����Base64����
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(data);// ����Base64��������ֽ������ַ���
	}
}
