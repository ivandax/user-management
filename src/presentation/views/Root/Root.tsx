import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Groups } from "presentation/views/Groups/Groups";

function Root(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Groups />} />
            </Routes>
        </BrowserRouter>
    );
}

export { Root };
