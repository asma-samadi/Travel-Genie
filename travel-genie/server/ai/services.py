import os
import requests

from .prompts import TRIP_PLANNER_PROMPT


def generate_trip_plan(trip_data):

    prompt = TRIP_PLANNER_PROMPT.format(
        trip_data=trip_data
    )


    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",

        headers={
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type": "application/json",
        },

        json={
            "model": "openai/gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )


    data = response.json()


    return data["choices"][0]["message"]["content"]