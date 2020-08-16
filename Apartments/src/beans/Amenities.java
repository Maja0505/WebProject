package beans;

public class Amenities {
	private String id;
	private String name;
	private int flag;
	public Amenities() {
		
	}

	public Amenities(String id, String name) {
		super();
		this.id = id;
		this.name = name;
		this.flag  = 0;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
	
	
}
