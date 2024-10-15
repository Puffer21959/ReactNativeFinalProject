<?php
include 'db.php';

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
session_start();
/////////////////////////////////////////////////////////////
/* if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo 'Welcome to RESTful login System';
    exit();
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['crud_req'] == 'register')
    registerUser($conn);

else if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['crud_req'] == 'login')
    login($conn);

else if ($_SERVER['REQUEST_METHOD'] == 'GET')
    logout($conn);

    function login($conn)
{

    $username = $_POST['userName'];
    $pwd = $_POST['pwd'];

    $sql = "select pwd from users where user_name=?;";
    $stmt = $conn->stmt_init();
    if (!$stmt->prepare($sql))
        httpReply(400, "Something went wrong");

    $stmt->bind_param('s', $username);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $isValid = password_verify($pwd, $data['pwd']);
        if ($isValid) {
            $key = password_hash($username, PASSWORD_DEFAULT);
            $_SESSION[$key] = $username;
            setcookie('user', $key);
            http_response_code(200);
            echo 'welcome ' . $username;
        } else {
            http_response_code(401);
            echo "Invalid User name or password";
        }
    }
    exit();
}

function registerUser($conn)
{

    $fName = $_POST['fName'];
    $lName  = $_POST['lName'];
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    $rPwd = $_POST['rPwd'];

    if (empty($fName) || empty($lName) || empty($userName) || empty($pwd) || empty($rPwd)) {
        http_response_code(401);
        echo "All fields need to be filled!!!";
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "bad email address";
        exit();
    }

    if ($pwd != $rPwd) {
        http_response_code(400);
        echo "passwords inconsistent";
        exit();
    }

    $pwd = password_hash($pwd, PASSWORD_DEFAULT);
    $rPwd = password_hash($rPwd, PASSWORD_DEFAULT);



    $sql = "Insert into users (first_name, last_name, user_name, email, pwd, r_pwd) values (?,?,?,?,?,?);";
    $stmt = $conn->stmt_init();
    if (!$stmt->prepare($sql)) {
        echo "smething went wrong!!!";
        exit();
    }
    $stmt->bind_param('ssssss', $fName, $lName, $userName, $email, $pwd, $rPwd);
    $stmt->execute();
    if ($stmt->affected_rows) {
        http_response_code(200);
        echo "Congratulation!!\n Registration successful\n";
    }
    exit();
}

function logout()
{
    if (!isset($_COOKIE['user'])) {
        echo "You are not logged in!!!";
        exit();
    }
    unset($_SESSION['user']);
    session_destroy();
    setcookie('user', false);
    echo "You are logged out!!! " . session_status();
    exit();
} */
/////////////////////////////////////////////////////////////////////////

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT * FROM users WHERE id=$id");
            $data = $result->fetch_assoc();
            echo json_encode($data);
        } else {
            $result = $conn->query("SELECT * FROM users");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $name = $input['name'];
        $email = $input['email'];
        $password = $input['password'];
        $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', $password)");
        echo json_encode(["messpassword" => "User added successfully"]);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $name = $input['name'];
        $email = $input['email'];
        $password = $input['password'];
        $conn->query("UPDATE users SET name='$name',
                     email='$email', password=$password WHERE id=$id");
        echo json_encode(["messpassword" => "User updated successfully"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM users WHERE id=$id");
        echo json_encode(["messpassword" => "User deleted successfully"]);
        break;

    default:
        echo json_encode(["messpassword" => "Invalid request method"]);
        break;
}

$conn->close();
?>