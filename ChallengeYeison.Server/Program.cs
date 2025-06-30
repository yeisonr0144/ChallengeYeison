using ChallengeYeison.Server.Interface;
using ChallengeYeison.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Registrar servicios
builder.Services.AddScoped<ISellerService, SellerService>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
// Add services to the container.

builder.Services.AddSingleton<ProductoService>();
builder.Services.AddSingleton<SellerService>();
builder.Services.AddSingleton<ReviewService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // frontend vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
