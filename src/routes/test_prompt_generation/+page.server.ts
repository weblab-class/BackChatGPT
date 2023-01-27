import {error } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import { PythonShell } from 'python-shell';

export const load : PageServerLoad = (async () => {
    let prompt : string
    var myPythonScriptPath = 'prompt_gen.py';

    // Use python shell
    
    var pyshell = new PythonShell(myPythonScriptPath);
    
    

    let message:Promise<string> = new Promise((resolve, reject) => {
        pyshell.on('message', function(message:any)  {
            // received a message sent from the Python script (a simple "print" statement)
            resolve(message)
            console.log(message)
            
        });
        pyshell.end(function (err: any) {
            if (err){
                throw err;
            };
        
            console.log('finished');
        }) ; 
    })
    prompt = await message 
    console.log(prompt)
    return {prompt: prompt}
    // end the input stream and allow the process to exit
    


}) ;
