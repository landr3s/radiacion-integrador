import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users', error);
        this.errorMessage = 'Error al cargar los usuarios.';
      }
    );
  }

  createUser(username: string, password: string, role: string) {
    this.userService.createUser(username, password, role).subscribe(
      (user) => {
        this.users.push(user);
        this.successMessage = 'Usuario creado correctamente.';
        this.errorMessage = ''; // Clear any previous error messages
      },
      (error) => {
        console.error('Error creating user', error);
        this.errorMessage = 'Error al crear el usuario.';
        this.successMessage = ''; // Clear any previous success messages
      }
    );
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; // Spread operator to create a copy
  }

  updateUser(userId: string, username: string) {
    this.userService.updateUser(userId, username).subscribe(
      (updatedUser) => {
        const index = this.users.findIndex((user) => user.id === userId);
        this.users[index].username = username;
        this.selectedUser = null;
        this.successMessage = 'Usuario actualizado correctamente.';
        this.errorMessage = ''; // Clear any previous error messages
      },
      (error) => {
        console.error('Error updating user', error);
        this.errorMessage = 'Error al actualizar el usuario.';
        this.successMessage = ''; // Clear any previous success messages
      }
    );
  }
}
