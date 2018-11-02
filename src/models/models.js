export function UserModel(userId, email, name, photoUrl) {
   this.userId = userId;
   this.email = email;
   this.name = name;
   this.photoUrl = photoUrl;
}

export function TableModel(tableId, tableName) {
   this.tableId = tableId;
   this.tableName = tableName;
}

export function SaloonModel(saloonId, saloonName) {
   this.saloonId = saloonId;
   this.saloonName = saloonName;
}