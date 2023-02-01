import Sentencer from 'sentencer'
import type { RequestHandler } from './$types';
import { OPENAI_KEY } from '$env/static/private';
import nounList from '$lib/wordLists/NounList.txt?raw'
import foodList from '$lib/wordLists/FoodList.txt?raw'
import occupationList from '$lib/wordLists/occupationList.txt?raw'
import famousPeople from '$lib/wordLists/famousPeople.txt?raw'

function randomElement<T>(array: T[]): T {
    let randomIndex = Math.floor(Math.random() * array.length)

    return array[randomIndex]
}

function a_string(string: string): string {
    let vowels = ['a', 'e', 'i', 'o', 'u']

    if (vowels.includes(string.charAt(0))) {
        return 'an ' + string
    } else {
        return'a ' + string 
    }
}

async function getOpenAiOutput(prompt: string): Promise<string> {
    const url = 'https://api.openai.com/v1/engines/davinci/completions';
    const params = {
        "prompt": prompt,
        "max_tokens": 250,
        "temperature": 0.5,
        "frequency_penalty": 0.5,
        "echo": false,
        "stop": '\n\n\n\n'
    };
    const headers = {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
    };

    try {
        let response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(params),})
        
        let json = await response.json()

        // @ts-ignore
        let output = `${prompt}${json.choices[0].text}`;
        // console.log(output);

        return Promise.resolve(output)
    } catch (err) {
        console.log(err);

        return Promise.reject(err)
    }
}

const nounListArray = nounList.split('\n')
const foodListArray = foodList.split('\n')
const occupationListArray = occupationList.split('\n')
const famousPeopleArray = famousPeople.split('\n')

Sentencer.configure({
    nounList: nounListArray,

    actions: {
        // @ts-ignore
        number: function(min: number, max: number, step: number): number {
            return Math.floor(Math.random() * (max - min + 1)/step ) * step + min
        },

        writing_types: function(): string {
            let options = ['story', 'tweet', 'letter', 'birthday card', 'note', 'article', 'description', 'review', 'narrative', 'anecdote', 'tale']

            return randomElement(options)
        },

        creation_types: function(): string {
            let options = ['create', 'generate', 'form', 'make me', 'write']

            return randomElement(options)
        },

        programming_langs: function(): string {
            let options = ['python', 'java', 'assembly', 'c', 'javascript']

            return randomElement(options)
        },

        programming_tasks: function(): string {
            let options = ['print hello world', 'loop through a list of items','get user text input', 'sort a list', 'capitalize a string']

            return randomElement(options)
        },

        spreadsheet_details: function(): string {
            let options = [
                {noun: 'top movies', singular: 'Movie', detailOptions: ['Release Data', 'Box Office Sales', 'Details']},
                {noun: 'top companies', singular: 'Company', detailOptions: ['Net Worth', 'CEO', 'Industry', 'Stock Price']},
                {noun: 'top selling toys', singular: 'Toy', detailOptions: ['Price']},
                {noun: 'sports teams', singular: 'Team', detailOptions: ['Mascot', 'Location']},
                {noun: 'jobs', singular: 'Job', detailOptions: ['Salary']},
                {noun: 'occupations', singular: 'Occupation', detailOptions: ['Salary']},
                {noun: 'airports', singular: 'Airport', detailOptions: ['Airport Code']},
                {noun: 'pets', singular: 'Pet', detailOptions: ['Size', 'Most Popular Name']},
                {noun: 'tourist attractions', singular: 'Tourist Attraction', detailOptions: ['Location']},
                {noun: 'stadiums', singular: 'Stadium', detailOptions: ['Capacity']},
                {noun: 'best-selling books', singular: 'Book Title', detailOptions: ['Author']},
                {noun: 'birds', singular: 'Bird', detailOptions: ['Color', 'Size', 'Diet']},
                {noun: 'popular breakfast foods', singular: 'Food', detailOptions: ['Calories']},
                {noun: 'popular desserts', singular: 'Dessert', detailOptions: ['Calories']},
                {noun: 'popular meals', singular: 'Meal', detailOptions: ['Calories']},
                {noun: 'popular cars', singular: 'Car', detailOptions: ['Top Speed', 'Sales', 'Price']},
                {noun: 'illnesses', singular: 'Illness', detailOptions: ['Symptoms']},
                {noun: 'countries', singular: 'Country', detailOptions: ['Population', 'GDP']},
                {noun: 'currencies', singular: 'Currency', detailOptions: ['Value in Dollars']},
                {noun: 'top mobile phones', singular: 'Phone', detailOptions: ['Price']},
                {noun: 'popular video games', singular: 'Game', detailOptions: ['Downloads']},
                {noun: 'holidays', singular: 'Holiday', detailOptions: ['Date']},
                {noun: 'hurricanes', singular: 'Hurricane', detailOptions: ['Year of Landfall']},
                {noun: 'college degrees', singular: 'Degree', detailOptions: ['Starting Salary']},
                {noun: 'months', singular: 'Month', detailOptions: ['Gemstone']},
                {noun: 'the longest rivers', singular: 'River', detailOptions: ['Length']},
                {noun: 'the tallest mountains', singular: 'Mountain', detailOptions: ['Height']},
                {noun: 'mammals', singular: 'Mammal', detailOptions: ['Size', 'Color', 'Diet', 'Habitat']},
                {noun: 'animals', singular: 'Animal', detailOptions: ['Size', 'Color', 'Diet', 'Habitat']},
                {noun: 'products', singular: 'Product', detailOptions: ['Manufacturer']},
                {noun: 'elements', singular: 'Element', detailOptions: ['Periodic Symbol', 'Atomic Number', 'Atomic Weight', 'Properties']},
                {noun: 'popular baby names', singular: 'Name', detailOptions: ['Popularity']},
                {noun: 'top universities', singular: 'University', detailOptions: ['Enrollment', 'Tuition', 'Graduation Rate', 'Acceptance Rate']},
                {noun: 'national parks', singular: 'National Park', detailOptions: ['Location']},
                {noun: 'presidents', singular: 'President', detailOptions: ['Term']},
                {noun: 'cities', singular: 'City', detailOptions: ['Population', 'Location', 'Weather', 'Crime Rate']},
            ]

            let item = randomElement(options)
            let detail = randomElement(item.detailOptions)

            return `${item.noun} and their ${detail.toLowerCase()}:\n\n${item.singular} | ${detail}`
        },

        foods: function(): string {
            let numberOfIngredients = Math.floor(Math.random() * 4) + 4
            let ingredients: string[] =[]

            while (ingredients.length != numberOfIngredients) {
                let ingredient = randomElement(foodListArray)

                if (!ingredients.includes(ingredient)) {
                    ingredients.push(ingredient)
                }
            }

            let foodString = ''

            for (let i = 0; i < ingredients.length; i++) {
                foodString += `${ingredients[i]}\n`
            }


            return foodString
        },

        an_occupation: function(): string {

            let occupation = randomElement(occupationListArray).toLowerCase()

            return a_string(occupation)
        },

        famous_person: function(): string {
            return randomElement(famousPeopleArray)
        },

        outline: function(): string {
            let options = ['an outline', 'bullet points', 'an introduction']

            return randomElement(options)
        },

        conversation_example: function(): string {
            let noun1 = randomElement(occupationListArray)
            let noun2 = randomElement([...occupationListArray, 'AI assistant'])
            let a_noun1 = a_string(noun1)
            let a_noun2 = a_string(noun2)

            return `${a_noun1} and ${a_noun2}:\n\n${noun1}: Hi there!`
        }
    }
})

export const GET: RequestHandler = (async () => {
    let options = [
        "Write a {{ number(50, 150, 5) }} word {{ writing_types }} about {{ a_noun }}:\n",
        "{{ creation_types }} a list of {{ number(2, 10, 1) }} items related to {{ nouns }}:\n\n1:",
        "What are {{ number(2, 5, 1) }} key points I should know about {{ nouns }}:\n\n1:",
        "The following is a conversation between {{ conversation_example }}",
        // "Write {{ programming_langs }} code to {{ programming_tasks }}:\n",
        "Create a two column spreadsheet with {{ spreadsheet_details }}\n",
        "Explain {{ nouns }} to a second grader:\n\n",
        "Write a recipe based on these ingredients and instructions:\n\nIngredients:\n{{ foods }}\n\nInstructions:\n",
        "{{ creation_types }} a list of {{ number(2, 6, 1) }} questions for an interview with {{ an_occupation }}:\n\n1:",
        `Create {{ outline }} for an ${randomElement(['article', 'essay'])} about {{ famous_person }}:`
    ]

    let templateString = randomElement(options)

    let prompt = Sentencer.make(templateString)

    let gptOutput = await getOpenAiOutput(prompt)

    gptOutput = gptOutput.replaceAll(prompt, '')

    let responseJSON = JSON.stringify({
        prompt: prompt,
        gptOutput: gptOutput
    })

    return new Response(responseJSON)
})