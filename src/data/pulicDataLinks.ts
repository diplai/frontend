/* eslint-disable prettier/prettier */
export interface PublicDataLink {
  name: string;
  desc: string;
  url: string;
}

export const publicDataLinks: PublicDataLink[] = [
  {
    name: "공공데이터포털 · 외교부 데이터",
    desc: "외교부가 제공하는 전체 공공데이터 목록",
    url: "https://www.data.go.kr/tcs/dss/selectDataSetList.do?org_id=1262000",
  },
  {
    name: "외교부 양자조약 정보",
    desc: "국가별 조약 체결·발효 현황",
    url: "https://www.mofa.go.kr/www/wpge/m_3835/contents.do",
  },
  {
    name: "국가·지역별 주요협정 정보",
    desc: "주요 협력 및 합의 사례",
    url: "https://www.mofa.go.kr/www/wpge/m_4099/contents.do",
  },
  {
    name: "MOFA OPEN DATA",
    desc: "외교 통계 및 국제 협정 정보",
    url: "https://www.mofa.go.kr/www/wpge/m_22747/contents.do",
  },
];
