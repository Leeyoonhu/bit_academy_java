$(document).ready(function(){
	var fAList = document.getElementById('fAList').value;
	var length = fAList.length; 
	fAList = fAList.split(",")
	var latList = document.getElementById('latList').value;
	latList = latList.split(",")
	var lonList = document.getElementById('lonList').value;
	lonList = lonList.split(",")
	var mapContainer = document.getElementById('map_n'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨 
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

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon);
        
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);
            
      });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    displayMarker(locPosition);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition) {
	var imageSrc = "https://i.ibb.co/ky1DywQ/Kakao-Talk-20221019-214448571.png"
	var imageSize = new kakao.maps.Size(50, 50);
	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    // 첫 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition,
        image : markerImage
    }); 
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + locPosition + '</div>');
        infowindow.open(map, marker);
    });
    for(var i = 0; i < lonList.length; i++){
		var fName = fAList[i].replace("[","")
		fName = fName.replace("]","")
    	var lat2 = latList[i].replace("[","");
    	lat2 = lat2.replace("]","")
    	lat2 = parseFloat(lat2)// 위도
       	var lon2 = lonList[i].replace("[",""); 
       	lon2 = lon2.replace("]","")
       	lon2 = parseFloat(lon2)// 경도
        var locPosition2 = new kakao.maps.LatLng(lat2, lon2);
    
    	var marker2 = new kakao.maps.Marker({
			map: map,
			position: locPosition2,
			image: markerImage
		})
    
    }
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}    


	
})