import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	try {
	    let result = await prisma.category.findMany();
	    return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
	    return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}

export async function POST(req, res) {
	BigInt.prototype.toJSON = function () {
		return this.toString();
	};
	try {
		const reqBody = await req.json();
		console.log(reqBody)
		const result = await prisma.category.create({
			data: {
				"parentId"  : reqBody["parentId"],
				"title"     : reqBody["title"],
				"metaTitle" : reqBody["metaTitle"],
				"slug"      : reqBody["slug"],
				"content"   : reqBody["content"]
			}
		});
		
		return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}
