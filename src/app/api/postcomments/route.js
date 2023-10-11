import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	try {
	    let result = await prisma.post_comment.findMany();
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
		const result = await prisma.post_comment.create({
			data: {
				"postId"   : reqBody["postId"],
				"parentId"   : reqBody["parentId"],
				"title"      : reqBody["title"],
				"published"  : reqBody["published"],
				"createdAt"  : new Date(reqBody["createdAt"]).toISOString(),
				"publishedAt"  : new Date(reqBody["publishedAt"]).toISOString(),
				"content"    : reqBody["content"]
			}
		});
		
		return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}
