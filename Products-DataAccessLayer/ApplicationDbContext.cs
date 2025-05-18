using Microsoft.EntityFrameworkCore;
using Products_DataAccessLayer.Model;

namespace Products_DataAccessLayer
{
    public class ApplicationDbContext:DbContext
    {

        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options) : base(options) 
        {


        }

        public DbSet<Product>Products { get; set; }




    }
}
