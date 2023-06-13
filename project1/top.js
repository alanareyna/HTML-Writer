/*
* Modified by: Alana Reyna
*/
const top = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        th, td {
            border: solid 1px;
            width: 600px;
            text-align: center;
        }

        td.title {
            width: 2000px;
            text-align: left;
            padding-left: 5px;
        }

        tr {
            width: 600px;
            border: solid 1px
            vertical-align: center;
            height: 50px;
        }

        table {
            border-collapse: collapse;
            margin: auto;
        }
    </style>
    <title>CS Department Course Schedule</title>
</head>
<body>
`;

module.exports = top;
