$(document).ready(function(){
var lat = document.getElementById('latitude').value; // 위도
var lon = document.getElementById('longitude').value; // 경도
var fName = document.getElementById('fName').value;
	var mapContainer = document.getElementById('map_n'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(parseFloat(lat), parseFloat(lon)), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    var locPosition = new kakao.maps.LatLng(parseFloat(lat), parseFloat(lon));
    displayMarker(locPosition);


// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition) {
	var imageSrc = "https://i.ibb.co/ky1DywQ/Kakao-Talk-20221019-214448571.png"
	var imageSize = new kakao.maps.Size(50, 50);
	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map : map, 
        position : locPosition,
        image : markerImage
    }); 
   	
   	// 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
	var iwContent = '<div style="padding:5px;">' + fName + '</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	
	// 인포윈도우를 생성합니다
	var infowindow = new kakao.maps.InfoWindow({
	    content : iwContent,
	});
	
	// 마커에 마우스오버 이벤트를 등록합니다
	kakao.maps.event.addListener(marker, 'mouseover', function() {
	  // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
	    infowindow.open(map, marker);
	});
	
	// 마커에 마우스아웃 이벤트를 등록합니다
	kakao.maps.event.addListener(marker, 'mouseout', function() {
	    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
	    infowindow.close();
	});
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}    
	
})