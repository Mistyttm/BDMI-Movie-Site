/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import paginationTotal from './paginationTotal';

export default (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(paginationTotal);
    }, [props.api]);

    return (
        <div className="ag-status-name-value">
        <span className="component">Row Count Component&nbsp;</span>
        <span className="ag-status-name-value-value">{paginationTotal}</span>
        </div>
    );
};