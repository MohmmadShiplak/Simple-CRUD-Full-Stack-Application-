using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Products_DataAccessLayer.Model;

namespace Products_API
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // Configuring primary key
            builder.HasKey(p => p.id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.Price)
                .IsRequired(); // Add if price should always exist
               // Adjust length as needed
              
                

            builder.ToTable("Products");


        }
    }
}
