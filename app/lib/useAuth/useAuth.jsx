const { useContext } = require("react")
const { AuthContext } = require("../contexts/AuthContext/AuthContext")

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;