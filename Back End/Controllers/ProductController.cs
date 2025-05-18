using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Products_BussinessLayer;
using Products_DataAccessLayer;
using Products_DataAccessLayer.Interfaces;
using Products_DataAccessLayer.Model;

namespace Products_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        readonly IProductRepositry<Product> _ProductRepositry;

        readonly ApplicationDbContext _context;
        public ProductController(IProductRepositry<Product> productRepositry, ApplicationDbContext conext)
        {
            _ProductRepositry = productRepositry;
            _context = conext;
        }

        [HttpGet("{id}")]
        public IActionResult GetbyID(int Id)
        {
            var entity = _ProductRepositry.GetById(Id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

    
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_ProductRepositry.GetAll());

        }

        [HttpGet("GetbyName")]
        public IActionResult GetbyName()
        {
            return Ok(_ProductRepositry.Find(b=>b.Name == "product1"));

        }

        [HttpPost("AddProducts")]
        public IActionResult AddProducts(Product product)
        {
           
            return Ok(_ProductRepositry.Add(product));
        }

        [HttpPut]
        public IActionResult UpdateProducts( Product product)
        {
         

            var updatedproduct = _ProductRepositry.Update(product);

            return Ok(updatedproduct);

        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound(); // 404 if product doesn't exist

            // Delete the product
            _ProductRepositry.Delete(product);

            // Return 200 OK with the deleted product in the response body
            return Ok(product);
        }







    }
}
