namespace Domain.Entities
{
public class TaskItem
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Details { get; set; } = string.Empty;
  public bool IsCompleted { get; set; } = false;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? DueAt { get; set; }

  //Soft Delete Properties
  public bool IsDeleted { get; set; } = false;

  public void Toggle() => IsCompleted = !IsCompleted;
  public void Delete()
  {
    IsDeleted = true;
  }
}
}