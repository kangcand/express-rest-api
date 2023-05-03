const express = require("express");
const router = express.Router();

// import express validator
const { body, validationResult } = require("express-validator");

// import database
const connection = require("../config/database");

// index post
router.get("/", function (req, res) {
  connection.query(
    "select * from posts order by id desc",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "internal server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Posts",
          data: rows,
        });
      }
    }
  );
});

// store post
router.post(
  "/store",
  [
    // validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
      });
    }

    //  define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // insert query
    connection.query("insert into posts set ?", formData, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Insert Data Successfully!",
          data: rows[0],
        });
      }
    });
  }
);

// show posts
router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `select * from posts where id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail Data Post",
          data: rows[0],
        });
      }
    }
  );
});

// update data posts
router.patch(
  "/update/:id",
  [
    // validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // id post
    let id = req.params.id;

    // formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // update query
    connection.query(
      `update posts set ? where id = ${id}`,
      formData,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update Data Successfully!",
            data: rows[0],
          });
        }
      }
    );
  }
);

// delete post
router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(`delete from posts where id=${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Delete Data Successfully!",
      });
    }
  });
});

module.exports = router;
