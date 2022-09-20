<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.util.*, java.sql.*, org.ai.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%	
	request.setCharacterEncoding("utf-8");
	String url = "jdbc:mysql://localhost:3306/miniProject1?useSSL=false&allowPublicKeyRetrieval=true";
	String sql = null;
	String user = "root";
	String password = "1234";
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;
	ArrayList<Board> bList = new ArrayList<Board>();
	ArrayList<Board> bList2 = new ArrayList<Board>();
	ArrayList<Comment> cList = new ArrayList<Comment>();
	String boardTitle = request.getParameter("boardTitle");
	int pages = Integer.parseInt(request.getParameter("pages"));
	int size = 0;
	int firstBoard = (15 * pages) - 15;
	int lastBoard = 15 * pages;
	
	try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		conn = DriverManager.getConnection(url, user, password);
		/* 게시판에 따른 보여줄 정보 거르기 */
		sql = "select * from board where boardTitle= ?";
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, boardTitle);
		rs = pstmt.executeQuery();
		while(rs.next()){
			bList.add(new Board(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getString(5), rs.getString(6),
					rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10).substring(0, 10)));
		}
		Collections.reverse(bList);
		size = bList.size();
		if(boardTitle.equals("screenBoard")){
			firstBoard = (10 * pages) - 10;
			lastBoard = 10 * pages;
			if(bList.size() < lastBoard){
				for(int i = firstBoard; i < bList.size(); i++){
					bList2.add(bList.get(i));
				}
			}
			else {
				for(int i = firstBoard; i < lastBoard; i++){
					bList2.add(bList.get(i));
				}
			}
		}
		else {
			if(bList.size() < lastBoard){
				for(int i = firstBoard; i < bList.size(); i++){
					bList2.add(bList.get(i));
				}
			}
			else {
				for(int i = firstBoard; i < lastBoard; i++){
					bList2.add(bList.get(i));
				}
			}
		}
		// 해당 글에 댓글이 몇개있는지 보여줘야함
		sql = "select number from comment";
		pstmt = conn.prepareStatement(sql);
		rs = pstmt.executeQuery();
		while(rs.next()){
			cList.add(new Comment(rs.getInt(1)));
		}
		session.setAttribute("size", size);	
		request.setAttribute("bList", bList2);
		request.setAttribute("cList", cList);
	} catch (Exception e){
		e.printStackTrace();
	}
%>
<%conn.close(); %>
</body>
</html>