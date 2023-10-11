import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	const id = req.url.split("users/")[1];
	const result = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	if (!result) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
	return NextResponse.json({ status: "Success", result: result });
}
//
export async function PATCH(req, res) {
	try {
		const id = req.url.split("users/")[1];
		const reqBody = await req.json();

		const result = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				"firstName"     : reqBody["firstName"],
				"moddleName"    : reqBody["moddleName"],
				"lastName"      : reqBody["lastName"],
				"mobile"        : reqBody["mobile"],
				"email"         : reqBody["email"],
				"passwordHash"  : reqBody["passwordHash"],
				"registeredAt"  : new Date(reqBody["registeredAt"]).toISOString(),
				"lastLogin"     : new Date(reqBody["lastLogin"]).toISOString(),
				"intro"         : reqBody["intro"],
				"profile"       : reqBody["profile"]
			},
		});
		
		return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}
//
export async function DELETE(req, res) {
	try {
		const id = req.url.split("users/")[1];
		const result = await prisma.user.delete({
			where: {
				id: id,
			}
		});
		
		return NextResponse.json({ status: "Success", result: "Delete user successfully" });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}