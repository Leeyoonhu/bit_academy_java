<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 가입 실패..</title>
<style type="text/css">
#joinFail2 {
	display: inline-block;
	float: right;
	width: 1400px;
	height: 1200px;
	margin-top: 200px;
	text-align: center;
}
</style>
</head>
<body>
<!-- 회원 가입시 아이디가 존재하는 경우 -->
<!--  -->
<script type="text/javascript">
	alert("입력하신 비밀번호와 비밀번호 확인이 다릅니다..")
</script>
<jsp:include page="./header.jsp"></jsp:include>
<div id="content">
<div id="joinFail2">
<form action="./joinForm.jsp" method="post">
<input type="submit" value="다시 회원가입 하러가기">
</form>
<br> <br>
<form action="./mainForm.jsp" method="post">
<input type="submit" value="메인으로 가기">
</form>
</div>
</div>
<jsp:include page="./footer.jsp"></jsp:include>
</body>
</html>