/*
    dvbstp.js
    - DVBSTP 패킷을 분석해서 bit별로 parsing 도 하고,
    - 각 항목에 값을 넣으면, 유효범위도 체크해서 DVBSTP 패킷을 만들기도 하고.
*/


var txt_ver = document.getElementById("ver");
var txt_reserv = document.getElementById("Reserv");
var txt_enc = document.getElementById("Enc");
var txt_c = document.getElementById("C");
var txt_totalSegmentSize = document.getElementById("Total_Segment_Size");
var txt_payloadId = document.getElementById("Payload_ID");
var txt_segmentId = document.getElementById("Segment_ID");
var txt_segmentVersion = document.getElementById("Segment_Version");
var txt_sectionNumber = document.getElementById("Section_Number");
var txt_lastSectionNumber = document.getElementById("Last_Section_Number");
var txt_compr = document.getElementById("Compr");
var txt_p = document.getElementById("P");
var txt_hdrLen = document.getElementById("HDR_LEN");
var txt_serviceProviderId = document.getElementById("ServiceProviderID");
var txt_privateHeaderData = document.getElementById("Private_Header_Data");
var txt_payload = document.getElementById("payload");
var txt_crc = document.getElementById("CRC");

var val_ver = "";
var val_reserv = "";
var val_enc = "";
var val_c = "";
var val_totalSegmentSize = "";
var val_payloadId = "";
var val_segmentId = "";
var val_segmentVersion = "";
var val_sectionNumber = "";
var val_lastSectionNumber = "";
var val_compr = "";
var val_p = "";
var val_hdrLen = "";
var val_serviceProviderId = "";
var val_privateHeaderData = "";
var val_payload = "";
var val_crc = "";

var dump_blob = (data, start_idx) => {
    var dump_str = ""; 
    for (let i= start_idx; i< data.length; i++) {
        dump_str += data[i].toString(16)+" ";
    }
    return dump_str;
}

var dvbstp_parse = (blob) => {
    val_ver = (blob[0] >> 6)& 0x03;
    val_reserv = (blob[0] >> 3)& 0x07;
    val_enc = (blob[0] >> 1)& 0x03;
    val_c = blob[0]& 0x01;
    val_totalSegmentSize = (blob[1] <<16) | (blob[2] << 8) | blob[3];
    val_payloadId = blob[4]&0xFF;
    val_segmentId = (blob[5]<<8) | blob[6]&0xFF;
    val_segmentVersion = blob[7]&0xFF;
    val_sectionNumber = (blob[8] << 4) | (blob[9] >> 4)&0x0F;
    val_lastSectionNumber = ((blob[9]&0x0F)<<8) | blob[10]&0xFF;
    val_compr = (blob[11] >> 5)& 0x07;
    val_p = (blob[11] >> 4)& 0x01;
    val_hdrLen = blob[11]& 0x0F;
    val_serviceProviderId = (blob[12] <<24) | (blob[13] <<16) | (blob[14] << 8) | blob[15]&0xFF;
    let payload_start_idx = 16;
    if ( 1 ) {      // PrivateHeaderData 는 Optional 임.
        val_privateHeaderData = (blob[16] <<24) | (blob[17] <<16) | (blob[18] << 8) | blob[19]&0xFF;
        payload_start_idx += 4;
    }
    val_payload = dump_blob( blob, payload_start_idx );
    // var val_crc = "";
}

var dvbstp_file_changed = (imgsrc) => {    /* when ThumbNail file upload succed. */
//   let imgTag = document.getElementById("dvbstp_file_in");
//   imgTag.src = "http://ccash.gonetis.com:88/uke_blog/data/"+ imgsrc;
//   document.getElementById("loadThumbnail_file").innerHTML = imgsrc;
    console.log(" 파일을 지정했다. 아직 loading 할 줄 모른다. ");
}

var dvbstp_from_text = () => {
    let long_text = document.getElementById("dvbstp_packet").value;
    console.log("test용 문자열: " + long_text );
    var blob = convert_text_to_blob(long_text);

    console.log("변환한 값: " );
    for (var i=0; i<blob.length; i++) {
        console.log(blob[i]);
    }
 
    dvbstp_parse(blob);
    set_result();
}


window.onload = function main() {
    // set_result();
}


var set_result = () => {
    txt_ver.innerHTML = "<sub>ver:</sub> "+val_ver;
    txt_reserv.innerHTML = "<sub>rsrv:</sub> "+val_reserv;
    txt_enc.innerHTML = "<sub>Enc:</sub> "+val_enc;
    txt_c.innerHTML = val_c;
    txt_totalSegmentSize.innerHTML = "<sub>Total_Segment_Size:</sub> "+val_totalSegmentSize + " (0x"+val_totalSegmentSize.toString(16).toUpperCase()+")";
    txt_payloadId.innerHTML = "<sub>Payload_ID:</sub> "+ val_payloadId + " (0x"+val_payloadId.toString(16).toUpperCase()+")";
    txt_segmentId.innerHTML = "<sub>Segment_ID:</sub> "+ val_segmentId + " (0x"+val_segmentId.toString(16).toUpperCase()+")";
    txt_segmentVersion.innerHTML = "<sub>Segment_Version:</sub> "+ val_segmentVersion + " (0x"+val_segmentVersion.toString(16).toUpperCase()+")";
    txt_sectionNumber.innerHTML = "<sub>Section_Number:</sub> "+ val_sectionNumber + " (0x"+val_sectionNumber.toString(16).toUpperCase()+")";
    txt_lastSectionNumber.innerHTML = "<sub>Last_Section_Number:</sub> "+ val_lastSectionNumber + " (0x"+val_lastSectionNumber.toString(16).toUpperCase()+")";
    txt_compr.innerHTML = "<sub>Compr:</sub> "+ val_compr;
    txt_p.innerHTML = val_p;
    txt_hdrLen.innerHTML = "<sub>HDR_LEN:</sub> "+ val_hdrLen
    txt_serviceProviderId.innerHTML = "<sub>ServiceProviderID:</sub> "+ val_serviceProviderId + " (0x"+val_serviceProviderId.toString(16).toUpperCase()+")";
    txt_privateHeaderData.innerHTML = "<sub>Private_Header_Data:</sub> "+ val_privateHeaderData + " (0x"+val_privateHeaderData.toString(16).toUpperCase()+")";
    txt_payload.innerHTML = val_payload;
    txt_crc.innerHTML = val_crc;
}

// var test_hex_string = " 56 27 88 ef 42 e4 42 88 ac 99 32 e4 3f 5a 2c 7b 99";
//     56, 27, 88, ef, 42, e4, 42, 88, ac, 99, 32, e4, 3f, 5a, 2c, 7b, 79, 55, 4e, 3, 54,2e, 55,56, 27, 88, ef, 42, e4, 42, 88, ac, 99, 32, e4, 3f, 5a, 2c, 7b, 79, 55, 4e, 3, 54,2e, 55,

var convert_text_to_blob = (inputtext) => {
    var str_array;
    if ( inputtext.indexOf(",") >= 0) {
        console.log("HAS comma");
        str_array = inputtext.split(',');
    } else {
        console.log("No Comma. Split with SPACE");
        str_array = inputtext.split(' ');
    }

    var ia = []; // new Uint8Array();
    for (let i=0; i<str_array.length; i++) {
        console.log(" 0x"+str_array[i] );
        ia.push( (parseInt(str_array[i], 16) & 0xFF) );         /// TODO:  여기에서 str_array[i] 의 값을 HEX 문자열에서 UINT8로 바꾸어 주어야 함.
    }
    return ia;
}
