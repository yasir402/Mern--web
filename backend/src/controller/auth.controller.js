const connection = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Secret key for JWT
const JWT_SECRET = "142424245242fgh"; // Replace with a strong secret key

// User Registration
async function register(req, res) {
    const { username, fullname, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        connection.query(
            'INSERT INTO users (username, full_name, email, password) VALUES (?, ?, ?, ?)',
            [username, fullname, email, hashedPassword],
            (error, results) => {
                if (error) {
                    console.error("Error registering user:", error);
                    return res.status(500).json({ message: "Error registering user" });
                }
                res.json(
                    {
                        sts : "success",
                        message: "User registered successfully"
                    }
                );
            }
        );
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

// User Login
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            async (error, results) => {
                if (error) {
                    console.error("Error finding user:", error);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }

                const user = results[0];

                // Compare the hashed password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid password" });
                }

                // Generate JWT token
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
                    expiresIn: "1h", // Token expiration time
                });

                res.json({
                    sts: "success",
                    message: "Login successful",
                    token, // Send the token to the client
                });
            }
        );
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Middleware to Authenticate Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user; // Attach user info to the request
        next();
    });
}

// Example Protected Route
function getProfile(req, res) {
    res.json({
        sts : 200,
        message: "Profile data",
        user: req.user, // User info from the JWT
    });
}

module.exports = {
    register,
    login,
    authenticateToken,
    getProfile,
};
