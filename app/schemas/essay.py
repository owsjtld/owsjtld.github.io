from pydantic import BaseModel, Field

class ScoreDetails(BaseModel):
    # 엑셀 저장 로직(data.scores.quantity 등)과 1:1 매핑되도록 필드를 복구/정의했습니다.
    quantity: int = Field(..., description="분량 점수 (1에서 10 사이)")
    grammar: int = Field(..., description="맞춤법 및 문장 구조 점수 (1에서 10 사이)")
    content: int = Field(..., description="내용의 풍부성 및 주제 부합도 (1에서 10 사이)")
    structure: int = Field(..., description="글의 구성(서론-본론-결론) 점수 (1에서 10 사이)")
    analysis: int = Field(..., description="박지원 분석 점수 (1에서 10 사이)")
    reflection: int = Field(..., description="양반 비판 점수 (1에서 10 사이)")
    plan: int = Field(..., description="실천 계획 점수 (1에서 10 사이)")
    logic: int = Field(..., description="논리성 점수 (1에서 10 사이)")

class EssayEvalResponse(BaseModel):
    student_name: str = Field(..., description="학생 이름 (식별 불가 시 '기특한 학생')")
    extracted_content: str = Field(..., description="이미지나 PDF에서 Gemini가 직접 정밀하게 읽어내고 인식한 독서록/에세이의 본문 원고 내용 전체")
    word_count: int = Field(..., description="에세이 글자 수 (공백 포함 정수)")
    scores: ScoreDetails = Field(..., description="항목별 상세 점수 객체")
    final_comment: str = Field(..., description="요구사항이 완벽히 반영된 최종 총평 코멘트")