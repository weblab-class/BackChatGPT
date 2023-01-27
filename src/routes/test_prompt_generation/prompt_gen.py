import nodebox_linguistics_extended as nle
import random

import openai


nouns = nle.basic.nouns
verbs = nle.basic.verbs
adjs = nle.basic.adjectives


def generate_prompt():
    noun_1 = random.choice(nouns)
    noun_2 = random.choice(nouns)
    noun_3 = random.choice(nouns)

    adj_1 = random.choice(adjs)
    adj_2 = random.choice(adjs)
    adj_3 = random.choice(adjs)
    prompt_choices = ['story', 'story', 'story',
                      'story', 'recipe', 'code', 'essay', 'essay']

    prompts = {'story': f"write me a 100 word story about a {noun_1}, a {noun_2} and a {noun_3}, without using the words {noun_1}, {noun_2} or {noun_3} in the story",
               'recipe': f"write a 100 word recipe to make a {adj_1}, {adj_2} {noun_1} without using the words {adj_1}, {adj_2}, or {noun_1} in the recipe",
               'code':  f"write 100 words of code about a {adj_1}, {adj_2} {noun_1} without using the words {adj_1}, {adj_2} or {adj_3}",
               'essay': f"write me an essay outline about a {adj_1} {noun_1} and a {noun_2} without using the words {adj_1}, {adj_2}, {noun_2}"
               }

    choice = random.choice(prompt_choices)
    return prompts[choice]


print(generate_prompt())
# openai.api_key = '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'

# gpt_prompt = generate_prompt()
# gpt_prompt = generate_prompts(1)[0]
# response = openai.Completion.create(
# model = "text-davinci-003", prompt = gpt_prompt, temperature = 0, max_tokens = 1000)

# with open('response.txt', 'w') as f:
# f.write(response['choices'][0]['text'])
# f.close()
# print(response['choices'][0]['text']
