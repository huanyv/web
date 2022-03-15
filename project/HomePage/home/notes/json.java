

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class json {
    public static void main(String[] args) {
	    Scanner s = new Scanner(System.in);
	    
        String JsonStr = readFileJSON("notes.json"); //获取JSON
        String newJsonStr = traverseFile(".", new StringBuilder());// 遍历当前目录及子目录下所有文件
        StringBuilder sb = new StringBuilder(JsonStr);
        sb.append(newJsonStr);
        sb.append("]");
        
		if (!newJsonStr.equals("")) { // 如果有文件
			System.out.println(newJsonStr);
			System.out.println("are you ok? y/n: ");
			String ok = s.next();
			if("y".equals(ok)) {
				System.out.println("success");
				writeFileJSON("notes.txt",sb.toString());
			}else {
				System.out.println("fail!!");
			}
		} else {
			System.out.println("not found!!");			
		}
    }

    public static void writeFileJSON(String path,String content) {
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(path));
            bw.write(content);
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

	// 从文件中读取JOSN数据
    public static String readFileJSON(String path) {
        BufferedReader bufferedReader = null;
        StringBuilder sb = new StringBuilder();
        try {
            InputStreamReader inputStreamReader = new InputStreamReader(new FileInputStream(path),"UTF-8");
            bufferedReader = new BufferedReader(inputStreamReader);
            String readData = "";
            while( (readData = bufferedReader.readLine()) != null ) {
                sb.append(readData);
                sb.append("\n");
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        int begin = 0,end = 0;
        for (int i = 0; i < sb.length(); i++) {
            if(sb.charAt(i) == '[') {
                begin = i;
                break;
            }
        }
        end = sb.lastIndexOf("]"); // 去掉最后的 ']'
        return sb.toString().substring(begin,end);
    }

    public static String traverseFile(String path,StringBuilder sb) {
        File[] files = new File(path).listFiles();
        for(File file : files) {
            if(file.isDirectory()) {
                String dirPath = path + "/" + file.getName();
                traverseFile(dirPath,sb);
            }
            if(file.isFile()) {
                String fileName = file.getName();
                String filePath = path + "/" + fileName;
                if( !JSONIsContainsFile(fileName) && fileNameIsEndsWith(fileName)) {
                    sb.append(",{");
                    sb.append("\n");
                    sb.append("\t\"url\": \"./notes" + formatUrl(filePath) + "\",");
                    sb.append("\n");
                    sb.append("\t\"title\": \"" + formatFileNameTitle(fileName) + "\",");
                    sb.append("\n");
                    sb.append("\t\"date\": \"" + formatDate(file.lastModified()) + "\"");
                    sb.append("\n");
                    sb.append("}");
                }
            }
        }
        return sb.toString();
    }

    public static boolean JSONIsContainsFile(String file) {
	    file = formatFileNameTitle(file);
        String JsonStr = readFileJSON("notes.json"); //获取JSON
        return JsonStr.contains(file);
    }

	// 指定后缀
    public static boolean fileNameIsEndsWith(String fileName) {
        return (fileName.endsWith("html") || fileName.endsWith("md")) 
            && !fileName.contains("index") 
            && !fileName.contains("README") 
            && !fileName.contains("_navbar");
    }

    // 格式化时间
    public static String formatDate(long time) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(time); // 格式化时间
    }
    // 格式化地址
    public static String formatUrl(String url){
        if(url.endsWith("md")) {
            return "/#" + url.substring(1,url.lastIndexOf("."));
        }
        return url.substring(1,url.length());
    }

    public static String formatFileNameTitle(String fileName) {
        return fileName.substring(0,fileName.lastIndexOf("."));
    }


}
