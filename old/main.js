(function ($) {

	var ready=false;
	var video;
	var speed=1.0;

	$(document).keypress(function(e) {
    if(e.which == 49) {
        console.log('You pressed 1!');
				speed=.5;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 50) {
        console.log('You pressed 2!');
				speed=.75;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 51) {
        console.log('You pressed 3!');
				speed=1.0;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 52) {
        console.log('You pressed 4!');
				speed=1.25;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 53) {
        console.log('You pressed 5!');
				speed=1.5;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 54) {
        console.log('You pressed 6!');
				speed=1.75;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 55) {
        console.log('You pressed 7!');
				speed=2.0;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 56) {
        console.log('You pressed 8!');
				speed=2.25;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }
		if(e.which == 57) {
        console.log('You pressed 9!');
				speed=2.5;
				document.getElementById("ready").textContent="Playback Speed: "+speed;
				video.playbackRate=speed;
    }

	});

	$("#submit_mp4").click(function () {
		var video_url = document.getElementById("mp4_url").value;
		var video_html='<source src="' + video_url + '"/>';
		$("#active_video").html(video_html);
		var video_width = $("#video_column").width();
		document.getElementById("active_video").style.width = ''+video_width-12;

		document.getElementById("mp4_submission").style.display = "none";
		document.getElementById("url_heads_up").style.display = "none";

		video = $("#active_video")[0];
		video.playbackRate= .75;
	});

	$("#submit_transcript").click(function () {
		var transcript_text=document.getElementById("transcript_entry").value;
		console.log(transcript_text);
		document.getElementById("transcript_submission").style.display = "none";
		document.getElementById("transcript_heads_up").style.display = "none";

		var parsed_transcript='';

		parsed_transcript += transcript_text;
		parsed_transcript = parsed_transcript.split('?').join('?</p><p>');
		parsed_transcript = parsed_transcript.split('!').join('!</p><p>');
		parsed_transcript = parsed_transcript.split(".").join(".</p><p>");
		parsed_transcript = parsed_transcript.split(",").join(",</p><p>");
		parsed_transcript = parsed_transcript.split("–").join("–</p><p>");
		parsed_transcript += "</p>";

		var sliced_transcript = parsed_transcript.split("</p><p>");
		parsed_slices=[];

		var id_count = 0;
		var id_tag="";

		for(i=0;i<sliced_transcript.length;i++){
			if(sliced_transcript[i].length>2 && sliced_transcript[i].charAt(0) != "\""){
				//while words<thresh
					//add space plus first line from next word]
					if(i<4){
						console.log(sliced_transcript[i].split(" ").length);
					}
				word_chunk = sliced_transcript[i];

				while (word_chunk.split(" ").length<=24){
					i++;
					word_chunk+=" "+sliced_transcript[i]
					sliced_transcript.push("");
				}


				id_tag='</p><p>'+word_chunk;

				parsed_slices.push(id_tag);
				id_count++;
			}else{
				last_index = parsed_slices.length-1;
				parsed_slices[last_index]+=sliced_transcript[i];
			}
		}

		//check char lengths of slices
		for(s=0; s<parsed_slices.length; s++){
				if(parsed_slices[s].length>40){
					//console.log(""+ s + " length:"+parsed_slices[s].length);
				}
		}


		render_transcript=parsed_slices.join("");

		$("#transcript_renderer").html('<p>' + render_transcript+'</p>');
		checkReady();
	})

	$("#transcript_renderer").on("click",'p',function(){
		//if ready
			$(this).slideUp();
			var additive_text = "";
			current_timestamp = convert_timestamp(video.currentTime);
			additive_text+=current_timestamp + "\n" + this.textContent.replace(/\r?\n|\r/g,"") + "\n" + current_timestamp + " --> ";

			var vtt_text = document.getElementById("vtt_renderer").textContent + additive_text;
			document.getElementById("vtt_renderer").textContent=vtt_text;
		//else:
			//heads up
		})

		function onkp(){
			console.log(video.currentTime);
		}

	function convert_timestamp(seconds){

		return "" + ("0"+(Math.floor(seconds/3600)%60)).slice(-2)+":"+("0"+(Math.ceil(seconds/60)-1)%60).slice(-2) + ":" + ("0"+Math.ceil(seconds%60)).slice(-2)+ (seconds%Math.floor(seconds)).toPrecision(3).substring(1,5);
	}

	$("#download_vtt").click(function(){
		var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});//
		//saveAs(blob, "hello world.txt");	//
		this.download="helloworld.txt";
	})

	//code from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	function download(filename, text) {
   	var element = document.createElement('a');
    	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    	element.setAttribute('download', filename);
    	element.style.display = 'none';
    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);
	}
	// Start file download.
	document.getElementById("download_vtt").addEventListener("click", function(){
    	// Generate download of hello.txt file with some content
    	var text = document.getElementById("vtt_renderer").textContent;
    	var filename = "tracks.vtt";
	   download(filename, text);
	}, false);

	function checkReady(){
		ready = true;
		document.getElementById("download_vtt").style.display = "block";
		setInterval(function(){
			video.play();
		}, 100);
	}

})(jQuery);
