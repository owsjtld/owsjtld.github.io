from pydantic import BaseModel, Field

class ScoreDetails(BaseModel):
    grammar: int = Field(..., description="맞춤법 및 문장 구조 점수 (1-10)", ge=1, le=10)
    content: int = Field(..., description="내용의 풍부성 및 주제 부합도 (1-10)", ge=1, le=10)
    structure: int = Field(..., description="글의 구성(서론-본론-결론) 점수 (1-10)", ge=1, le=10)

class EssayEvalResponse(BaseModel):
    student_name: str = Field(..., description="학생 이름 (식별 불가 시 '기특한 학생')")
    
    # ⭐ [필드 추가] Gemini가 이미지/PDF에서 읽어낸 텍스트 원문이나 분석 내용을 저장할 공간
    extracted_content: str = Field(..., description="이미지나 PDF에서 Gemini가 직접 정밀하게 읽어내고 인식한 독서록/에세이의 본문 원고 내용 전체")
    
    word_count: int = Field(..., description="에세이 글자 수 (공백 포함 정수)")
    scores: ScoreDetails = Field(..., description="항목별 상세 점수 객체")
    final_comment: str = Field(..., description="요구사항이 완벽히 반영된 최종 총평 코멘트")