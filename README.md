# 간이 DVBSTP_packetizer
DVBSTP 패킷화 동작을 테스트 하기 위해서, Sample 용 Pakcet을 만들어 주는 기능.
- packet header (?) 분석.
- binary 파일로 부터 읽어 들이기.
- 또는 TEXT 창에 직접 16진수로 입력한 값을 분석.

#### TODO
- packet 분석한 값의 field별 오류체크 (특히 length, last_section_number 등)
- CRC 분리
- payload 부분을 따로 file 로 다운로드
- Header 부분을 따로 편집하면 전체 packet 을 생성(?) 해 주는 기능
- 등..
