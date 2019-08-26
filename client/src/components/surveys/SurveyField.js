// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label }) => {
    return (
        <>
            <label>{label}</label>
            <input {...input} />
        </>
    );
};
