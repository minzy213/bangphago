from transformers import ElectraTokenizer, ElectraForSequenceClassification
from torch.nn.functional import softmax
import torch
import os

def get_vector(search:str):
    tokenizer_path = "./lm/tokenizer"
    tokenizer = ElectraTokenizer.from_pretrained(tokenizer_path)
    inputs = tokenizer(search, return_tensors="pt")

    vector = []
    for model in ['guide', 'interior', 'story', 'probability', 'creativity', 'production', 'device', 'fun', 'service']:
        model_path = "./lm/models/" + model + "_model"
        model = ElectraForSequenceClassification.from_pretrained(model_path)
        model.resize_token_embeddings(len(tokenizer))
        outputs = model(**inputs)
        # 소프트맥스 함수를 사용하여 확률값 계산
        probabilities = softmax(outputs.logits, dim=1)

        # 가장 높은 확률값에 해당하는 클래스 선택
        predicted_class = torch.argmax(probabilities).item()

        vector.append(predicted_class)
    
    
    return vector


