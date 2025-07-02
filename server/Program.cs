using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// ✅ Enable CORS (so frontend can talk to backend)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ✅ Add SignalR
builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors();

// ✅ Map the SignalR hub
app.MapHub<ChatHub>("/chathub");

app.Run();

// ✅ Define your SignalR Hub
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
