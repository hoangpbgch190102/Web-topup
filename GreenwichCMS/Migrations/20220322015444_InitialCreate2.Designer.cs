﻿// <auto-generated />
using System;
using GreenwichCMS.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GreenwichCMS.Migrations
{
    [DbContext(typeof(GreenwichContext))]
    [Migration("20220322015444_InitialCreate2")]
    partial class InitialCreate2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("GreenwichCMS.Models.Comment", b =>
                {
                    b.Property<Guid>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("IdeaId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ReplyBy")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("CommentId");

                    b.HasIndex("IdeaId");

                    b.HasIndex("ReplyBy");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Idea", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Author")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FinalClosureDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FirstClosureDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("IdeaCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Privacy")
                        .HasColumnType("bit");

                    b.Property<string>("Slug")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("IdeaCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Idea");
                });

            modelBuilder.Entity("GreenwichCMS.Models.IdeaCategory", b =>
                {
                    b.Property<Guid>("IdeaCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdeaId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdeaCategoryId");

                    b.ToTable("IdeaCategory");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Reaction", b =>
                {
                    b.Property<Guid>("ReactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Context")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("IdeaId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ReactionId");

                    b.HasIndex("IdeaId");

                    b.HasIndex("UserId");

                    b.ToTable("Reaction");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Roles", b =>
                {
                    b.Property<Guid>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoleName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Users", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Gender")
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("LastName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Comment", b =>
                {
                    b.HasOne("GreenwichCMS.Models.Idea", "Idea")
                        .WithMany()
                        .HasForeignKey("IdeaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GreenwichCMS.Models.Users", "Users")
                        .WithMany()
                        .HasForeignKey("ReplyBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Idea");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Idea", b =>
                {
                    b.HasOne("GreenwichCMS.Models.IdeaCategory", "IdeaCategory")
                        .WithMany("Idea")
                        .HasForeignKey("IdeaCategoryId");

                    b.HasOne("GreenwichCMS.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("IdeaCategory");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Reaction", b =>
                {
                    b.HasOne("GreenwichCMS.Models.Idea", "Idea")
                        .WithMany()
                        .HasForeignKey("IdeaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GreenwichCMS.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Idea");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GreenwichCMS.Models.Users", b =>
                {
                    b.HasOne("GreenwichCMS.Models.Roles", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("GreenwichCMS.Models.IdeaCategory", b =>
                {
                    b.Navigation("Idea");
                });
#pragma warning restore 612, 618
        }
    }
}
