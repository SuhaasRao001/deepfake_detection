import torch

def load_model(model_path, device):
    model = torch.load(model_path, map_location=device)
    model.eval()
    return model
