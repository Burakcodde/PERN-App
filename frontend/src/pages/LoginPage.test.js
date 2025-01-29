import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("LoginPage", () => {
  it("renders login form", () => {
    render(
      <AuthProvider>
        <Router>
          <LoginPage />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits login form", async () => {
    axios.post.mockResolvedValue({ data: { token: "test-token" } });

    render(
      <AuthProvider>
        <Router>
          <LoginPage />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5001/api/auth/login", {
      username: "testuser",
      password: "testpassword",
    });
  });
});