/* ================================
    우쿨렐레 악보에 MP3 싱크 맞추는 프로그램.
================================ */

var song_list = [
  "하와이 연정 - 패티킴",
  "언제나 몇번이나 - 센과 치히로의 행방불명 OST",
  "때로는 옛 이야기를 - 붉은 돼지 OST",
  "세계의 약속 - 하울의 움직이는 성 OST",
  "비행기 구름 - 바람이 분다 OST", 
  "El Condor Pasa - 핑거스타일",
  "El Condor Pasa - 멜로디",
  "Kiss the Rain - 이루마",
  "코쿠리코 언덕에서 - 지브리OST",
  "인생의 회전목마 - 하울의 움직이는 성 OST",
  "비와 당신",
  "바다가 보이는 마을 - 마녀의 택급편",
  "Somewhere over the rainbow - IZ",
  "너에게 난 나에게 넌 - 자탄풍(자전거 탄 풍경)"
];
var file_list = [
  "http://ccash.gonetis.com:88/uke_blog/data/hawaiian_lovesong.json",
  "http://ccash.gonetis.com:88/uke_blog/data/itsumonandodemo.json",
  "http://ccash.gonetis.com:88/uke_blog/data/sometimes_telling_old_story.json",
  "http://ccash.gonetis.com:88/uke_blog/data/appointment_of_world.json",
  "http://ccash.gonetis.com:88/uke_blog/data/hikoki_gumo.json",
  "http://ccash.gonetis.com:88/uke_blog/data/elcondorpasa_fingerstyle.json",
  "http://ccash.gonetis.com:88/uke_blog/data/elcondorpasa_melody.json",
  "http://ccash.gonetis.com:88/uke_blog/data/kiss_the_rain_new.json",
  "http://ccash.gonetis.com:88/uke_blog/data/kokuriko-ghibri.json",
  "http://ccash.gonetis.com:88/uke_blog/data/merry_go_round_in_Life.json",
  "http://ccash.gonetis.com:88/uke_blog/data/rain_and_you.json",
  "http://ccash.gonetis.com:88/uke_blog/data/umigamierumachi.json",
  "http://ccash.gonetis.com:88/uke_blog/data/SomewhereOvertheRainbow.json",
  "http://ccash.gonetis.com:88/uke_blog/data/me_toyou_you_tome.json"
];

var CHORD_ICON_Y = 48;
var STROKE_ICON_Y = 136;
var TAB_LINE_A_Y = 80;
var TAB_LINE_E_Y = 96;
var TAB_LINE_C_Y = 112;
var TAB_LINE_G_Y = 128;
var LYRIC_TEXT_Y = 164;
var START_XPOS = 40;
var note_icon;          // 운지 위치 (flet)을 표시하는 숫자들 - 비트맵, 스프라이트


var canvas_width = 0, canvas_height = 0;
var note_drew = 0;
var last_timestamp = 0;

var note_space = 36;    // - 8분음표 기준 or 16분음표 기준, or etc..

var song_data = null;   // 우쿨렐레 TAB 악보를 불러 올 JSON 객체. 
var drawInterval;
var animationHandler;

var wavePosition = 0;
var array_l = [];
var array_r = [];
var audioTag;

window.onload = function main() {
  ////  bitmap resources ready.
  note_icon = document.getElementById("uke_note");
  total_chord_table = document.getElementById("whole_chords");

  let initialNumber = getParameterByName("play");
  if ( ! initialNumber ) {
    initialNumber = 0;
  }
  console.log("request initial Song file index:" + initialNumber );


  ////  악보 데이터를 고를 수 있도록 selector 준비.
  selector = document.getElementById("song_list");
  if (initialNumber >= song_list.length)    // index overflow 방지.
    initialNumber = 0;
  for (var i=0; i<song_list.length; i++) {
    var item = document.createElement("option");
    item.text = song_list[i];
    item.value = file_list[i];
    if (i == initialNumber) 
      item.selected="selected";
    selector.appendChild(item);
  }
  selector.onchange = function() {
    console.log("Song file - Changed : " + file_list[selector.selectedIndex] );
    wavePosition = 0;
    xmlhttp.open("GET", file_list[selector.selectedIndex], true);
    xmlhttp.send();
  }

  ////  loading *.uke JSON data
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      song_data = JSON.parse(this.responseText);
      // console.log("--> parsing Song file:" + JSON.stringify(song_data)  );
      let title = document.getElementById("song_title");
      let category = document.getElementById("song_category");
      title.innerHTML = song_data.title;
      category.innerHTML = song_data.category;

      ////  Drawing Tabulature
      resize_canvas( window.innerWidth-30);
    }
  };

  xmlhttp.open("GET", file_list[initialNumber], true);
  xmlhttp.send();

}

window.addEventListener("resize", window_resized);

function window_resized(event) {
  resize_canvas (event.target.innerWidth-30 );
}

function resize_canvas(cnvs_width) {
  var cnvs = document.getElementsByClassName("tabulature");
  for (var i = 0; i<cnvs.length; i++ ) {
    cnvs[i].width = cnvs_width;     // event.target.innerWidth-30;
    cnvs[i].height = 200;     // event.target.innerWidth-30;
  }
  canvas_width = cnvs_width;

  console.log("Ready to draw .." );
  draw_tabulature();
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var chord_name_table = [
  "C",   "Cm",   "C7",  "Cmaj7",  "Cm7",  "Cdim",  "Cm7b5",  "Caug",  "Csus4",  "C6",  "C9",  "Cmaj9",  "Cmmaj7",  "Cadd9",
  "C#",  "C#m",  "C#7", "C#maj7", "C#m7", "C#dim", "C#m7b5", "C#aug", "C#sus4", "C#6", "C#9", "C#maj9", "C#mmaj7", "C#add9",
  "D",   "Dm",   "D7",  "Dmaj7",  "Dm7",  "Ddim",  "Dm7b5",  "Daug",  "Dsus4",  "D6",  "D9",  "Dmaj9",  "Dmmaj7",  "Dadd9",
  "D#",  "D#m",  "D#7", "D#maj7", "D#m7", "D#dim", "D#m7b5", "D#aug", "D#sus4", "D#6", "D#9", "D#maj9", "D#mmaj7", "D#add9",
  "E",   "Em",   "E7",  "Emaj7",  "Em7",  "Edim",  "Em7b5",  "Eaug",  "Esus4",  "E6",  "E9",  "Emaj9",  "Emmaj7",  "Eadd9",
  "F",   "Fm",   "F7",  "Fmaj7",  "Fm7",  "Fdim",  "Fm7b5",  "Faug",  "Fsus4",  "F6",  "F9",  "Fmaj9",  "Fmmaj7",  "Fadd9",
  "F#",  "F#m",  "F#7", "F#maj7", "F#m7", "F#dim", "F#m7b5", "F#aug", "F#sus4", "F#6", "F#9", "F#maj9", "F#mmaj7", "F#add9",
  "G",   "Gm",   "G7",  "Gmaj7",  "Gm7",  "Gdim",  "Gm7b5",  "Gaug",  "Gsus4",  "G6",  "G9",  "Gmaj9",  "Gmmaj7",  "Gadd9",
  "G#",  "G#m",  "G#7", "G#maj7", "G#m7", "G#dim", "G#m7b5", "G#aug", "G#sus4", "G#6", "G#9", "G#maj9", "G#mmaj7", "G#add9",
  "A",   "Am",   "A7",  "Amaj7",  "Am7",  "Adim",  "Am7b5",  "Aaug",  "Asus4",  "A6",  "A9",  "Amaj9",  "Ammaj7",  "Aadd9",
  "A#",  "A#m",  "A#7", "A#maj7", "A#m7", "A#dim", "A#m7b5", "A#aug", "A#sus4", "A#6", "A#9", "A#maj9", "A#mmaj7", "A#add9",
  "B",   "Bm",   "B7",  "Bmaj7",  "Bm7",  "Bdim",  "Bm7b5",  "Baug",  "Bsus4",  "B6",  "B9",  "Bmaj9",  "Bmmaj7",  "Badd9",
];
var total_chord_table;  // 코드 테이블을 모아 둔 비트맵

////  TAB 악보의 바탕 (4줄) 그리기.
var draw_tab_lines = function(ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas_width,canvas_height);
  ctx.lineWidth = "2px";
  ctx.fillStyle = "black";
  ctx.moveTo(10,TAB_LINE_A_Y);    ctx.lineTo(canvas_width-20, TAB_LINE_A_Y);
  ctx.moveTo(10,TAB_LINE_E_Y);    ctx.lineTo(canvas_width-20, TAB_LINE_E_Y);
  ctx.moveTo(10,TAB_LINE_C_Y);    ctx.lineTo(canvas_width-20, TAB_LINE_C_Y);
  ctx.moveTo(10,TAB_LINE_G_Y);    ctx.lineTo(canvas_width-20, TAB_LINE_G_Y);
  ctx.stroke();
  ctx.font = '18px NotoSansCJKKR';    // font 설정 - 주로 가사 표시할 때 사용될 폰트.
  // 'TAB' 표시 
  ctx.drawImage(note_icon, 19*18, 0, 28, 63,   10, TAB_LINE_A_Y-8, 28, 63);     // src_x, y, w, h ,  dst x, y, w, h
}

////   JSON데이터(배열)로 악표 표시
var draw_notes = function(ctx, data, start_idx) {
  var xpos;
  var count = 0;
  for (var i=start_idx; i<data.length; i++) {
    xpos = START_XPOS + ((data[i].timestamp-last_timestamp)/480) *note_space;           //// 악보 내에 note 간의 간격 = 480,
    if (xpos >= canvas_width) {
      break;
    }
    draw_a_note(ctx, data[i], xpos );
    count+=1;
  }
  last_timestamp = data[i-1].timestamp;
  return count;
}

////   1개의 화음을 표시
var draw_a_note = function(ctx, data, xpos) {
  var g, c, e, a;             // 플랫 정보
  var f_g, f_c, f_e, f_a;     // finger 정보 
  var c_g, c_c, c_e, c_a;     // 숫자의 색상 (y좌표) 컬러 값 (1=검지=green, 2=중지=Magenta, 3=약지=CYAN, 4=새끼=짙은파랑)

  data.tab.forEach(element => {
    switch(element.substr(0,1) ) {
      case "G":
        f_g = element.substr(-1);
        g = ( f_g >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_g = (f_g=='i')? 46 : (f_g=='m')? 31 : (f_g=='a')? 16 : (f_g=='c')? 61 : 1 ;
        break;
      case "C":
        f_c = element.substr(-1);
        c = ( f_c >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_c = (f_c=='i')? 46 : (f_c=='m')? 31 : (f_c=='a')? 16 : (f_c=='c')? 61 : 1 ; 
        break;
      case "E":
        f_e = element.substr(-1);
        e = ( f_e >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_e = (f_e=='i')? 46 : (f_e=='m')? 31 : (f_e=='a')? 16 : (f_e=='c')? 61 : 1 ; 
        break;
      case "A":
        f_a = element.substr(-1);
        a = ( f_a >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_a = (f_a=='i')? 46 : (f_a=='m')? 31 : (f_a=='a')? 16 : (f_a=='c')? 61 : 1 ; 
        break;
    }
  });

  // 마디 구분 표시
  if (data.technic) {
    if (data.technic.indexOf('|') >= 0) {   // 마디 표시
      ctx.fillRect(xpos-2, TAB_LINE_A_Y, 1, (TAB_LINE_G_Y-TAB_LINE_A_Y) );
    }
    // if ( data.technic.indexOf('3') >= 0 ) {     // 셋 잇단음표를 표시
    //   ctx.drawImage(note_icon, 339, 92, 14,8,  xpos+8, STROKE_ICON_Y+8,  14,8);
    // }
  }

  // 코드 표시 (아이콘)
  if (data.chord) {         // 코드를 표시
    var chord_index = chord_name_table.indexOf(data.chord);
    // console.log("chord: ["+data.chord+"] ==> index: " + chord_index );
    ctx.drawImage(total_chord_table, (chord_index%14)*50, parseInt(chord_index/14)*54, 49,53,  xpos, 10,  49, 53);
  }
  // 스트로크 방향 및 Hammering-On, Pulling-Off, Slide 등을 표시 
  if (data.stroke) {         // 스트로크를 표시
    // console.log("stroke: " + data.stroke );
    if ( data.stroke.indexOf('D') >= 0 ) {
      ctx.drawImage(note_icon, 339, 64, 14,26,  xpos, STROKE_ICON_Y,  14,26);
    } else if ( data.stroke.indexOf('U') >= 0 ) {
      ctx.drawImage(note_icon, 354, 64, 14,26,  xpos, STROKE_ICON_Y,  14,26);
    } 
    if ( data.stroke.indexOf('H') >= 0 ) {
      ctx.drawImage(note_icon, 369, 65, 11,15,  xpos+16, STROKE_ICON_Y,  11,15);
    } else if ( data.stroke.indexOf('P') >= 0 ) {
      ctx.drawImage(note_icon, 382, 65, 11,15,  xpos+16, STROKE_ICON_Y,  11,15);
    } else if (data.stroke.indexOf('s') >= 0 ) {    // 슬라이드를 표시
      ctx.drawImage(note_icon, 339, 92, 14,8,  xpos+8, STROKE_ICON_Y+8,  14,8);
    }
    if ( data.stroke.indexOf('~') >= 0 ) {
      ctx.drawImage(note_icon, 369, 0, 9, 63,  xpos+14, STROKE_ICON_Y-64,  9,63);
    }
  }
  // 화음 및 음표에 따른 연주 플랫 정보를 표시. 
  if (g != undefined ) {
    ctx.drawImage(note_icon, g*18, c_g, 15, 12,   xpos, TAB_LINE_G_Y-8, 16, 14);     // src_x, y, w, h ,  dst x, y, w, h
  }
  if (c != undefined ) {
    ctx.drawImage(note_icon, c*18, c_c, 15, 12,   xpos, TAB_LINE_C_Y-8, 16, 14);     // src_x, y, w, h ,  dst x, y, w, h
  }
  if (e != undefined ) {
    ctx.drawImage(note_icon, e*18, c_e, 15, 12,   xpos, TAB_LINE_E_Y-8, 16, 14);     // src_x, y, w, h ,  dst x, y, w, h
  }
  if (a != undefined ) {
    ctx.drawImage(note_icon, a*18, c_a, 15, 12,   xpos, TAB_LINE_A_Y-8, 16, 14);     // src_x, y, w, h ,  dst x, y, w, h
  }
  // 가사를 표시
  if (data.lyric) {
    ctx.fillText( data.lyric, xpos, LYRIC_TEXT_Y );
  }

}

////   전체 악보를 표시. 처음부터 끝까지.
function draw_tabulature() {
  var cnvs_group = document.getElementById("tab_canvas");

  var cnvs = cnvs_group.getElementsByClassName("tabulature");
  // 우선 기존에 붙어 있던 canvas 들이 있으면 몽땅 다 제거 해 놓고..
  for (var i=0; cnvs.length > 0; i++) {
    cnvs[0].remove();
  }
  // 캔버스도 초기화 했으므로 모든 시작점도 초기화.
  note_drew = 0;        // 그려진 음표(note)의 수.
  last_timestamp = 0;
  // drawing_start = 0;    // 캔버스에 그려질 TAB 악보의 시작점. - 각 마디/라인 마다 캔버스를 분리해서 그릴 경우.

  // console.log("Drawing...: " + JSON.stringify(song_data) );
  if ( (song_data == undefined)||(song_data == null) ) {
    return;
  }

  // while( note_drew < song_data.notes.length ) {
  while( note_drew < 50 ) {           // 50 개의 note 만 표시해 본다. 
      // console.log("note_drew:"+note_drew+" < total num of notes:"+song_data.notes.length+" ..." );
    // 새로운 캔버스를 만들어 추가한다.
    cnvs = document.createElement("canvas");
    cnvs.classList.add("tabulature");
    cnvs.width = canvas_width;
    cnvs.height = canvas_height = 200;
    cnvs_group.appendChild(cnvs);
    var ctx = cnvs.getContext("2d");
    ctx.textBaseline = 'top';
    ctx.font = '18px NotoSansCJKKR';
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.fillStyle = 'black';

    draw_tab_lines(ctx);    // 바탕이 되는 4선(TAB line)을 그린다.
    note_drew += draw_notes(ctx, song_data.notes, note_drew);
    // console.log(" drawn notes = " + note_drew );
  }
  console.log("end of while .. note_drew:"+note_drew+" < song_data.length:"+song_data.notes.length+" ...: " );


  /////////
  //  데이터 안에 MP3 링크(?)가 있는 경우에만 표시한다.
  var mp3wave_grph = document.getElementById("mp3");
  var cnvs = mp3wave_grph.getElementsByClassName("mp3_wave");
  
  audioTag = document.getElementById("playing_audio");

  for (var i=0; cnvs.length > 0; i++) {
    cnvs[0].remove();
  }
  if (song_data.source) {     // mp3 데이터가 있는 경우에만 표시.
    cnvs = document.createElement("canvas");
    cnvs.classList.add("mp3_wave");
    cnvs.width = canvas_width;
    cnvs.height = canvas_height = 200;
    mp3wave_grph.appendChild(cnvs);
    var ctx = cnvs.getContext("2d");
    ctx.textBaseline = 'top';
    ctx.font = '18px NotoSansCJKKR';
    ctx.fillStyle = 'blue';
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    ctx.fillStyle = 'darkblue';

    // ////  loading *.MP3 data :   refer : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
    console.log("--> request:" + song_data.source );
    array_l = [];
    array_r = [];

    audioTag.src = "http://ccash.gonetis.com:88/uke_blog/data/"+song_data.source;

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "http://ccash.gonetis.com:88/uke_blog/data/"+song_data.source, true);
    oReq.responseType = "arraybuffer";
    // clearInterval(animationHandler);
    oReq.onload = function() {      //     // oReq.onreadystatechange = function() {
      console.log("xmlhttpReq... sftp://ccash.gonetis.com:/home/ahnsik/ukulele/"+song_data.source);
      if (this.readyState != 4 || this.status != 200) {
        console.log("... readyState=" + this.readyState + ", status="+this.status );
        return;
      }

      var waveBuffer = oReq.response; // Note: not oReq.responseText
      console.log("start decode MP3");
      var decodedBuffer = mp3Decode(waveBuffer);
       console.log("interval function");
        if (array_l) {
          console.log("[][] starting MP3 draw...");
          mp3Draw(array_l, ctx);   //        const float32Array_left = audioBuf.getChannelData(0);
        }

    };
    oReq.send(null);
    console.log("--> request_end:" + song_data.source );
  }

  var last_posX=0, last_posY=0;
  var last_wav_pos = 0;
  mp3wave_grph.onmousedown = function(e) {
    // var rect = e.target.getBoundingClientRect();
    // console.log("touch pos:"+(e.clientX-rect.left)+","+(e.clientY-rect.top) );      //    console.log("touch pos:"+ e.clientX+","+e.clientY );
    last_posX = e.clientX;
    last_posY = e.clientY;
    last_wav_pos = wavePosition;
    e.preventDefault();
  }
  mp3wave_grph.onmousemove = function(e) {
    wavePosition = e.clientX-last_posX;
    console.log("touch pos(wavePosition):"+(e.clientX-last_posX) );
    e.preventDefault();

    if (array_l) {
      mp3Draw(array_l, ctx);   //        const float32Array_left = audioBuf.getChannelData(0);
    }
  }
  mp3wave_grph.onmouseup = function(e) {
    var rect = e.target.getBoundingClientRect();
    console.log("touch pos:"+(e.clientX-rect.left)+","+(e.clientY-rect.top) );      //    console.log("touch pos:"+ e.clientX+","+e.clientY );
    e.preventDefault();
  }

  async function mp3Decode(arrayBuffer) {
    console.log("(MP3)arrayBuffer length:"+arrayBuffer.length);
    const ac = new AudioContext();
    const audioBuf =  await ac.decodeAudioData(arrayBuffer);
    console.log("[][] ac.decodeAudioData:"+audioBuf.length+" bytes, channels="+audioBuf.numberOfChannels+", sampleRate="+audioBuf.sampleRate );    // refer AudioBuffer: https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
    var float32Array_l = audioBuf.getChannelData(0);
    // var float32Array_r = audioBuf.getChannelData(1);
    const chunkSize = 100;
    let i=0;
    const length = float32Array_l.length;
    while(i<length) {
      array_l.push( float32Array_l.slice(i, i+chunkSize).reduce(function(total,value) {
        return Math.max(total, Math.abs(value));
      }));
      // array_r.push( float32Array_r.slice(i, i+chunkSize).reduce(function(total,value) {
      //   return Math.max(total, Math.abs(value));
      // }));
      i+=chunkSize;
    }  

    console.log("End of decode:"+arrayBuffer.length);
    if (array_l) {
      mp3Draw(array_l, ctx);   //        const float32Array_left = audioBuf.getChannelData(0);
    }
  }

  async function mp3Draw(arrayBuffer, ctx) {
    // console.log("begin drawing.. : decodedBuffer length:"+arrayBuffer.length);
    ctx.clearRect(0, 0, 2048, 200);

    for (var i = 0; i< canvas_width; i++) {
    }
    
    for (let index = wavePosition; index< wavePosition+2048; index++ ) {       ////     // for (let index =0; index< array_l.length; index++ ) {
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo( Number(index-wavePosition), 100 - array_l[index]* 100 );
      ctx.lineTo( Number(index-wavePosition), 100 + array_l[index]* 100 );
      ctx.stroke();

      // ctx.strokeStyle = "red";
      // ctx.beginPath();
      // ctx.moveTo( Number(index-wavePosition), 100 );
      // ctx.lineTo( Number(index-wavePosition), 100 - array_r[index]* 100 );
      // ctx.stroke();
    }
    // console.log("end of draw:"+arrayBuffer.length);
  }

}


var play_handler = null;

var play_song = function() {
  audioTag.play();

  if (play_handler==null) {
    play_handler = setInterval( function() {
      console.log( audioTag.currentTime );
      if (audioTag.ended) {
        stop_song();
      }
    }, 500);
    console.log("Play : Set Interval. :" + play_handler);
  } else {
    console.log("Handler aleady set.");
  }
}

var pause_song = function() {
  audioTag.pause();
  clearInterval(play_handler);
  play_handler = null;
  console.log("Pause: Clear Interval. :" + play_handler);
}

var stop_song = function() {
  audioTag.pause();
  audioTag.currentTime = 0;
  clearInterval(play_handler);
  play_handler = null;
  console.log("Stopped. - Clear Interval. :" + play_handler);
}