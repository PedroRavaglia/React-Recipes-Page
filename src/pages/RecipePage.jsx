
import { useRef } from 'react'

function handleChange(i, refLabel, refSteps, e) {
    e.target.checked ?
        [refLabel.current[i].style.color, refSteps.current[i].style.color] = ["gray", "gray"] :
        [refLabel.current[i].style.color, refSteps.current[i].style.color] = ["black", "black"];
}

export default function RecipePage({ recipesData }) {
    const refLabel = useRef([]);
    const refSteps = useRef([]);

    return (
        <div className="recipe-page-container">
            <h1 className="recipe-name mb-4">{ recipesData.name }</h1>
            <p className="description">{ recipesData.description }</p>

            <div className="image-info">
                <img className='recipe-page' src={ recipesData.img_src } />

                <div className="card border-secondary ms-4 h-25">
                    <div className="card-body">
                        {recipesData.prep_info.map((info, i) => {
                            return (
                                <div key={i}>
                                    <p className="card-text mb-3">
                                        <b>{ info[0] }</b>
                                        {`: ${info[1]}`}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <hr className="division"></hr>

            <div className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {recipesData.ingredients.map((ingredient, i) => {
                        return (
                            <div key={i}>
                                <label><input type="checkbox"/>{ ingredient }</label>
                                <br/>
                            </div>
                        )
                    })}
                </ul>
            </div>

            <hr className="division"></hr>

            <div className="steps">
                <h2>Steps</h2>
                <ol>
                    {recipesData.steps.map((step, i) => {
                        return (
                            <div key={i}>
                                <label 
                                    className="label-checkbox" 
                                    ref={(el) => {refLabel.current[i] = el}}
                                >
                                    <input 
                                        className="steps-checkbox" 
                                        type="checkbox"
                                        onChange={(el) => handleChange(i, refLabel, refSteps, el)}
                                    />
                                    { `Step ${i+1}` }
                                </label>
                                <li ref={(el) => {refSteps.current[i] = el}}>{ step }</li>
                            </div>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}