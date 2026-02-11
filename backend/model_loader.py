import torch
import torch.nn as nn
from torchvision import models


class SpatialCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.base = models.efficientnet_b0(weights=None)

        in_features = self.base.classifier[1].in_features

        self.base.classifier = nn.Sequential(
            nn.Linear(in_features, 128),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        return self.base(x)


def load_model(model_path: str, device: str):
    model = SpatialCNN().to(device)

    state_dict = torch.load(model_path, map_location=device)
    model.load_state_dict(state_dict)

    model.eval()
    return model
