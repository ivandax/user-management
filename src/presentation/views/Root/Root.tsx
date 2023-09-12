import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Groups } from "presentation/views/Groups/Groups";
import { AddGroup } from "presentation/views/AddGroup/AddGroup";
import { Users } from "presentation/views/Users/Users";

function Root(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Groups />} />
                <Route path="/add-group" element={<AddGroup />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export { Root };
