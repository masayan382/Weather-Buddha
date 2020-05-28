$(function () {
	$('.slider').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: false,
		draggable: false,
		focusOnSelect: false,
		swipe: false,
		touchMove: false,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
	$('.button').on('click', function () {
		$('.slider').slick('slickPlay');
	});

	$('#btn').on('click', function () {
		var city = $('#spot').val();

		$.ajax({
			url:
				'http://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&APPID=○○○',
			dataType: 'json',
			cache: false,
		})
			.done(function (response) {
				$('#weather').text(response.weather[0].main);
				$('#humidity').html(response.main.humidity);
				$('#description').html(response.weather[0].description);
				$('#temp').html(Math.round(response.main.temp));

				//天気に応じた天気アイコンを表示させる
				switch (response.weather[0].main) {
					case 'Clouds':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/04d.png' >"
						);
						break;
					case 'Snow':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/13d.png' >"
						);
						break;
					case 'Rain':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/09d.png' >"
						);
						break;
					case 'Clear':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/01d.png' >"
						);
						break;
					case 'Fog':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/50d.png' >"
						);
						break;
					case 'Mist':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/50n.png' >"
						);
						break;
					case 'Haze':
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/50d.png' >"
						);
						break;
					default:
						$('#weatherMark').html(
							"<img src='http://openweathermap.org/img/w/01n.png' >"
						);
				}
				//googlemap
				var jlat = response.coord.lat;
				var jlng = response.coord.lon;

				var map = function initMap() {
					map = new google.maps.Map(document.getElementById('map'), {
						center: { lat: jlat, lng: jlng },
						zoom: 14,
					});
				};
				map();
				// consaole.log('地図');
				//googlemapここまで
				//寺選択開始
				switch (response.name) {
					case 'Itabashi':
						$('#daibutu').html('東京大仏');
						$('#temple').html('乗蓮寺');
						$('#photo').html(
							'<img src="img/tokyo1.jpg" alt="tokyo" class="photo">'
						);
						$('#location').html('東京都板橋区赤塚5丁目28番3号');
						break;
					case '鎌倉市':
						$('#daibutu').html('鎌倉大仏');
						$('#temple').html('高徳院');
						$('#photo').html(
							'<img src="img/kamakura1.jpg" alt="kamakura" class="photo">'
						);
						$('#location').html('神奈川県鎌倉市長谷４丁目２−２８');
						break;
					case '奈良市':
						$('#daibutu').html('奈良大仏');
						$('#temple').html('東大寺');
						$('#photo').html(
							'<img src="img/nara1.jpg" alt="nara" class="photo">'
						);
						$('#location').html('奈良県奈良市雑司町４０６−１');
						break;
					case '岐阜':
						$('#daibutu').html('岐阜大仏');
						$('#temple').html('正法寺');
						$('#photo').html(
							'<img src="img/gifu1.jpg" alt="gifu" class="photo"">'
						);
						$('#location').html('岐阜県岐阜市大仏町8');
						break;
					case '神戸市':
						$('#daibutu').html('神戸大仏');
						$('#temple').html('能福寺');
						$('#photo').html(
							'<img src="img/kobe3.jpg" alt="kobe" class="photo"">'
						);
						$('#location').html('兵庫県神戸市兵庫区北逆瀬川町1-39');
						break;
					default:
				}
				//寺選択ここまで
			})
			.fail(function (xhr) {
				alert('データの取得に失敗しました');
			})
			.always(function (xhr, msg) {});
		// $('#result').addClass('active');
		$('#result').fadeIn(2000);

		var move = $('#result').offset().top;
		$('html,body').animate({
			scrollTop: move
	}, 400);
	});
});
