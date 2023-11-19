from transformers import ElectraTokenizer, ElectraForSequenceClassification
from sklearn.metrics import precision_recall_fscore_support, accuracy_score, classification_report
from torch.nn.functional import softmax
import torch
import os

def get_vector(search:str):
    tokenizer_path = "./lm/tokenizer"
    tokenizer = ElectraTokenizer.from_pretrained(tokenizer_path)
    inputs = tokenizer(search, return_tensors="pt")

    vector = []
    for model in os.listdir("./lm/models"):
        model_path = "./lm/models/" + model
        model = ElectraForSequenceClassification.from_pretrained(model_path)
        model.resize_token_embeddings(len(tokenizer))
        outputs = model(**inputs)
        # 소프트맥스 함수를 사용하여 확률값 계산
        probabilities = softmax(outputs.logits, dim=1)

        # 가장 높은 확률값에 해당하는 클래스 선택
        predicted_class = torch.argmax(probabilities).item()

        vector.append(predicted_class)
        print(f"Input Text: {search}")
        print(f"Predicted Class: {predicted_class}")
        print(f"Class Probabilities: {probabilities}")
    
    
    return vector


