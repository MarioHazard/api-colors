const Color = require('../models/color.model.js');
const o2x = require('object-to-xml');
// Retrieve and return all colors from the database.
exports.findAll = (req, res) => {
  //receive query values and assing defaults
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var per_page = req.query.per_page ? parseInt(req.query.per_page) : 6;
  var total = 0;
  var total_pages=0;
  Color.countDocuments({}, function(error, n_docs) {
    total=n_docs;
    total_pages=(total%per_page==0)? total/per_page : parseInt(total/per_page)+1;
  });
  
  Color.find().limit(per_page).skip(per_page*(page-1))
    .then(colors => {
        let result = colors.map(function(item){
          return {id : item["_id"],name : item["name"], color : item["color"]}
        });
        let obj = { '?xml version=\"1.0\" encoding=\"UTF-8\"?' : null,
                    colors : {
                      '#' : { color : result }
                    }
        };
      if(req.query.type=='xml'){
          res.set('Content-Type', 'text/xml').send(o2x(obj));
      }else{
          res.send({page:page, per_page:per_page, total:total,total_pages:total_pages, data:result});
      }
  }).catch(err => {
    res.status(500).send({
    message: err.message || "Something went wrong while getting list of colors."
  });
});
};

// Create and Save a new Color
exports.create = (req, res) => {
  // Validate request
  if(!req.body) {
    return res.status(400).send({
    message: "Content can not be empty"
  });
  }
  // Create a new Color
  const color = new Color({
    name: req.body.name,
    year: req.body.year,
    color: req.body.color,
    pantone_value: req.body.pantone_value
  });
  // Save color in the database
  color.save()
    .then(data => {
      console.log('ADD new color '+data.name);
      res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something went wrong while creating new color."
    });
  });
};

// Find a single Color with a id
exports.findOne = (req, res) => {
  Color.findOne({'id':req.params.id}).then(color => {
    if(!color) {
      return res.status(404).send({
        message: "Color not found with id " + req.params.id
      });
    }
    var result = {
        id: color.id,
        name: color.name,
        year: color.year,
        color: color.color,
        pantone_value: color.pantone_value
      };
    console.log('GET color '+color.name);
    let obj = { 
        '?xml version=\"1.0\" encoding=\"UTF-8\"?' : null,
        color : {'#' : result }
    };
    if(req.query.type=='xml'){
      res.set('Content-Type', 'text/xml').send(o2x(obj));
    }else{
      res.send(result);
    }
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Color not found with id " + req.params.id
        });
    }
    return res.status(500).send({
      message: "Error getting color with id " + req.params.id
    });
  });
};

// Update a Color identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find color and update it with the request body
  Color.findAndUpdate({'id':req.params.id}, {
    id: req.body.id,
    name: req.body.name,
    year: req.body.year,
    color: req.body.color,
    pantone_value: req.body.pantone_value
  }, {new: true}).then(color => {
    if(!color) {
      return res.status(404).send({
      message: "color not found with id " + req.params.id
    });
    }
    console.log('UPDATE color '+color.name);
    res.send(color);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "color not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error updating color with id " + req.params.id
    });
  });
};

// Delete a Color with the specified id in the request
exports.delete = (req, res) => {
Color.findAndRemove({'id':req.params.id})
.then(color => {
if(!color) {
  return res.status(404).send({
  message: "color not found with id " + req.params.id
});
}
console.log('DELETED color '+color.name);
res.send({message: "color deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "color not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete color with id " + req.params.id
});
});
};